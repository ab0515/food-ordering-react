import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUser(state, action) {
			return {
				...state,
				loginSuccess: action.payload
			}
		},
		authUser(state, action) {
			return {
				...state,
				userData: action.payload
			}
		}
	}
});

export const { loginUser, authUser } = userSlice.actions;

export default userSlice.reducer;