import { createSlice } from  '@reduxjs/toolkit'

// State value is string indicating which view to be displayed
const initialState = {
	serial: ''
}

export const slice = createSlice({
	name: 'asset',
	initialState,
	reducers: {
		setAsset: (state, action) => {
			state.serial = action.payload;
		},
	},
});

export const { setAsset } = slice.actions;

export const selectAsset = state => state.asset.value;

export default slice.reducer;