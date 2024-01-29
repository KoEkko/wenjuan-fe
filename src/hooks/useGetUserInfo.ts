import { useSelector } from "react-redux";
import { StateType } from "../store";
import { userType } from "../store/userReducer";
const useGetUserInfo = () => {
	const { username, nickname } = useSelector<StateType>((state) => state.user) as userType;
	return { username, nickname };
};

export default useGetUserInfo;
