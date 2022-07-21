import { createSlice } from  '@reduxjs/toolkit'

const initialState = {
	user: {}
}

export const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = slice.actions;

export const selectUser = state => state.app.user;

export default slice.reducer;