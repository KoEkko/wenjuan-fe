import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN_PATHNAME, MANAGE_LIST_PATHNAME, isLoginOrRegister, isNoNeedUserInfo } from "../router";

const useNavPage = (waitingUserData: boolean) => {
	const { username } = useGetUserInfo();
	const nav = useNavigate();
	const { pathname } = useLocation();
	useEffect(() => {
		// 正在加载中不需要
		if (waitingUserData) return;
		// 已经登录了
		if (username) {
			// 当前页面在登录、注册页面时跳转到管理页
			if (isLoginOrRegister(pathname)) {
				nav(MANAGE_LIST_PATHNAME);
			}
			return;
		}

		// 未登录
		if (isNoNeedUserInfo(pathname)) {
			// 不需要用户信息
			return;
		} else {
			nav(LOGIN_PATHNAME);
		}
	}, [username, pathname, waitingUserData]);
};

export default useNavPage;
