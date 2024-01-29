import React, { FC, useEffect } from "react";
import { Typography, Space, Form, Input, Button, Checkbox, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import { loginService } from "../services/user";
import { MANAGE_LIST_PATHNAME } from "../router";
import { setToken } from "../utils/user-token";

const { Title } = Typography;

const USERNAME_KEY = "username";
const PASSWORD_KEY = "password";

const setUserInfo = (username: string, password: string) => {
	localStorage.setItem(USERNAME_KEY, username);
	localStorage.setItem(PASSWORD_KEY, password);
};

const getUserInfoFromStorage = () => {
	return {
		[USERNAME_KEY]: localStorage.getItem(USERNAME_KEY),
		[PASSWORD_KEY]: localStorage.getItem(PASSWORD_KEY),
	};
};

const deleteUserInfoFromStorage = () => {
	localStorage.removeItem(USERNAME_KEY);
	localStorage.removeItem(PASSWORD_KEY);
};

const Login: FC = () => {
	const [form] = Form.useForm();
	const nav = useNavigate();
	useEffect(() => {
		const { username, password } = getUserInfoFromStorage();
		form.setFieldsValue({ username, password });
	}, []);
	const { run } = useRequest(
		async (username: string, password: string) => {
			const data = await loginService(username, password);
			return data;
		},
		{
			manual: true,
			onSuccess(result) {
				const { token = "" } = result;
				setToken(token);
				message.success("登录成功");
				nav(MANAGE_LIST_PATHNAME);
			},
		}
	);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onFinish = (values: any) => {
		const { username, password, remember } = values;
		run(username, password);
		if (remember) {
			setUserInfo(username, password);
		} else {
			deleteUserInfoFromStorage();
		}
	};
	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserAddOutlined />
					</Title>
					<Title level={2}>登录</Title>
				</Space>
			</div>
			<div>
				<Form
					wrapperCol={{ span: 16 }}
					labelCol={{ span: 6 }}
					onFinish={onFinish}
					form={form}
					initialValues={{ remember: true }}
				>
					<Form.Item
						name="username"
						label="用户名"
						rules={[
							{ required: true, message: "请输入用户名" },
							{ type: "string", min: 5, max: 20, message: "字符长度在 5 - 20 之间" },
							{ pattern: /^\w+$/, message: "只能是字母下划线" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 16, offset: 6 }}>
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Form.Item wrapperCol={{ span: 16, offset: 6 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
							<Link to="/register">注册</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
