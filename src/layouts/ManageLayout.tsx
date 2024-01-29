import React, { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Divider, Flex, message } from "antd";
import { createQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./ManageLayout.module.scss";
const ManageLayout: FC = () => {
	const nav = useNavigate();
	const { pathname } = useLocation();
	const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
		manual: true,
		onSuccess(result) {
			const { id } = result;
			nav(`/question/edit/${id}`);
			message.success("创建成功");
		},
	});
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Flex vertical gap="middle">
					<Button size="large" icon={<PlusOutlined />} type="primary" onClick={handleCreateClick} disabled={loading}>
						新建问卷
					</Button>
					<Divider style={{ borderTop: "transparent" }} />
					<Button
						size="large"
						icon={<BarsOutlined />}
						type={pathname.startsWith("/manage/list") ? "default" : "text"}
						onClick={() => nav("list")}
					>
						我的问卷
					</Button>
					<Button
						size="large"
						icon={<StarOutlined />}
						type={pathname.startsWith("/manage/star") ? "default" : "text"}
						onClick={() => nav("star")}
					>
						星标问卷
					</Button>
					<Button
						size="large"
						icon={<DeleteOutlined />}
						type={pathname.startsWith("/manage/trash") ? "default" : "text"}
						onClick={() => nav("trash")}
					>
						回收站
					</Button>
				</Flex>
			</div>
			<div className={styles.right}>
				<Outlet />
			</div>
		</div>
	);
};

export default ManageLayout;
