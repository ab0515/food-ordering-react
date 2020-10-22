import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		orderAdded(state, action) {
			state.push(action.payload);
		}
	}
});

export const { orderAdded } = ordersSlice.actions;

export default ordersSlice.reducer;