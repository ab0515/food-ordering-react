import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: []
};

const restaruantSlice = createSlice({
	name: 'restaurant',
	initialState,
	reducers: {
		getRestaurants(state, action) {
			return {
				...state,
				data: action.payload
			}
		}
	}
});

export const { getRestaurants } = restaruantSlice.actions;

export default restaruantSlice;