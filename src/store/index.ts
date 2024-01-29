import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { userType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";

export type StateType = {
	user: userType;
	components: ComponentsStateType;
};

export default configureStore({
	reducer: {
		user: userReducer,
		// 组件列表
		components: componentsReducer,
	},
});
