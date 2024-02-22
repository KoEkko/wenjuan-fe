import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { userType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import PageInfoReducer, { PageInfoType } from "./PageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";

export type StateType = {
	user: userType;
	components: StateWithHistory<ComponentsStateType>;
	pageInfo: PageInfoType;
};

export default configureStore({
	reducer: {
		user: userReducer,
		// 组件列表
		components: undoable(componentsReducer, {
			limit: 20, //限制 undo 20步
			filter: excludeAction([
				"components/resetComponents",
				"components/changeSelectedId",
				"components/selectPrevComponent",
				"components/selectNextCompoent",
			]),
		}),
		pageInfo: PageInfoReducer,
	},
});
