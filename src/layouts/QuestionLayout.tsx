import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import useLoadUserInfo from "../hooks/useLoadUserInfo";
import useNavPage from "../hooks/useNavPage";
const MainLayout: FC = () => {
	// 加载用户信息
	const { waitingUserData } = useLoadUserInfo();
	// 用户没有登录时，跳转到登录页
	useNavPage(waitingUserData);
	return (
		<div style={{ height: "100vh" }}>
			{waitingUserData ? (
				<div style={{ textAlign: "center", marginTop: "300px" }}>
					<Spin />
				</div>
			) : (
				<Outlet />
			)}
		</div>
	);
};

export default MainLayout;
