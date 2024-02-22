import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { produce } from "immer";

export type PageInfoType = {
	title: string;
	desc?: string;
	js?: string;
	css?: string;
	isPublished?: boolean;
};

export const INIT_STATE: PageInfoType = {
	title: "",
	desc: "",
	js: "",
	css: "",
};

const pageInfoSlice = createSlice({
	name: "pageInfo",
	initialState: INIT_STATE,
	reducers: {
		resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
			return action.payload;
		},
		// 修改标题
		changeTitle: produce((draft: PageInfoType, action: PayloadAction<string>) => {
			const newTitle = action.payload;
			draft.title = newTitle;
		}),
	},
});
export const { resetPageInfo, changeTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
