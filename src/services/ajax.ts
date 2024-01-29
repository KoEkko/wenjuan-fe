import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";

export type ResType = {
	errno: number;
	data?: ResDataType;
	msg?: string;
};
export type ResDataType = {
	[key: string]: any;
};

const instance = axios.create({
	timeout: 10 * 100,
});

// 每次请求都带上token
instance.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${getToken()}`; // JWT的固定格式
		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use((res) => {
	const resData = (res.data || {}) as ResType;
	const { errno, data, msg } = resData;
	if (errno !== 0) {
		// 错误提示
		if (msg) {
			message.error(msg);
		}
	}
	return data as any;
});

export default instance;
