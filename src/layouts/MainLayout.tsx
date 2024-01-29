import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import styles from "./MainLayout.module.scss";
import useLoadUserInfo from "../hooks/useLoadUserInfo";
import useNavPage from "../hooks/useNavPage";
const { Header, Content, Footer } = Layout;
const MainLayout: FC = () => {
	const { waitingUserData } = useLoadUserInfo();
	useNavPage(waitingUserData);
	return (
		<Layout>
			<Header className={styles.header}>
				<div>
					<Logo />
				</div>
				<div>
					<UserInfo></UserInfo>
				</div>
			</Header>
			<Content className={styles.main}>
				{waitingUserData ? (
					<div style={{ textAlign: "center", marginTop: "300px" }}>
						<Spin />
					</div>
				) : (
					<Outlet />
				)}
			</Content>
			<Footer className={styles.footer}>小慕问卷 &copy; 2024 - present. Created by KoEkko</Footer>
		</Layout>
	);
};

export default MainLayout;
