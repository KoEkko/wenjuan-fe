import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { getUserInfoService } from "../services/user";
import useGetUserInfo from "./useGetUserInfo";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";

const useLoadUserInfo = () => {
	const [waitingUserData, setWaitingUserData] = useState(true);
	const dispatch = useDispatch();
	const { run } = useRequest(getUserInfoService, {
		manual: true,
		onSuccess(result) {
			const { username, nickname } = result;
			dispatch(loginReducer({ username, nickname })); // 存储到 redux store中
		},
		onFinally() {
			setWaitingUserData(false); // 最终会设置 waitingUserData , 触发重新执行， 加载不成功就会继续加载
		},
	});
	// 判断当前 redux store 是否已经存在用户信息
	const { username } = useGetUserInfo();
	useEffect(() => {
		if (username) {
			setWaitingUserData(false); // 如果 redux store 已经存在用户信息，就不用重新加载了
			return;
		}
		run(); // 如果 redux store 中没有用户信息，则进行加载
	}, [username]);
	return { waitingUserData };
};

export default useLoadUserInfo;
