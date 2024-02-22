import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
import List from "../pages/manage/List";

// 路由懒加载
const Edit = lazy(() => import(/* webpackChunkName:"editPage" */ "../pages/question/Edit"));
const Stat = lazy(() => import(/* webpackChunkName:"statPage" */ "../pages/question/Stat"));
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "manage",
				element: <ManageLayout />,
				children: [
					{
						path: "list",
						element: <List />,
					},
					{
						path: "star",
						element: <Star />,
					},
					{
						path: "trash",
						element: <Trash />,
					},
				],
			},
			{
				path: "*", // 404 路由配置，都写在最后
				element: <NotFound />,
			},
		],
	},
	{
		path: "/question",
		element: <QuestionLayout />,
		children: [
			{
				path: "edit/:id",
				element: <Edit />,
			},
			{
				path: "stat/:id",
				element: <Stat />,
			},
		],
	},
]);
export default router;

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_LIST_PATHNAME = "/manage/list";

export const isLoginOrRegister = (pathname: string) => {
	if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
	else return false;
};

export const isNoNeedUserInfo = (pathname: string) => {
	if ([LOGIN_PATHNAME, REGISTER_PATHNAME, HOME_PATHNAME].includes(pathname)) return true;
	else return false;
};
