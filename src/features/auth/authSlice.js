import { createSlice } from "@reduxjs/toolkit";

const authSLice = createSlice({
	name: "auth",
	initialState: { token: null },
	reducers: {
		setCredentials: (state, action) => {
			const { accessToken } = action.payload;
			state.token = accessToken;
		},
		logOut: (state, action) => {
			state.token = null;
		},
	},
});

export const { setCredentials, logOut } = authSLice.actions;

export default authSLice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
