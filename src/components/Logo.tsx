import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Space } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styles from "./Logo.module.scss";
import { HOME_PATHNAME, MANAGE_LIST_PATHNAME } from "../router";
import useGetUserInfo from "../hooks/useGetUserInfo";
const { Title } = Typography;
const Logo: FC = () => {
	const { username } = useGetUserInfo();
	const [pathname, setPathName] = useState(HOME_PATHNAME);
	useEffect(() => {
		if (username) {
			setPathName(MANAGE_LIST_PATHNAME);
		}
	}, [username]);
	return (
		<div className={styles.container}>
			<Link to={pathname}>
				<Space>
					<Title>
						<FormOutlined></FormOutlined>
					</Title>
					<Title>小慕问卷</Title>
				</Space>
			</Link>
		</div>
	);
};

export default Logo;
