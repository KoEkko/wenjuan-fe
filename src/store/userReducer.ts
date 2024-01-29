import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type userType = {
	username: string;
	nickname: string;
};
const INIT_STATE: userType = { username: "", nickname: "" };

const userSlice = createSlice({
	name: "user",
	initialState: INIT_STATE,
	reducers: {
		loginReducer: (state: userType, action: PayloadAction<userType>) => {
			return action.payload; // 设置 username 、nickname 到 redux store
		},
		logoutReducer: () => INIT_STATE,
	},
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
