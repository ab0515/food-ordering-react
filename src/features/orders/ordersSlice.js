import { createSlice } from '@reduxjs/toolkit';
import menuItems from '../../data/menuItems.json';

const initialState = {
	orders: menuItems,
	quantityById: {},
};

const initAmt = 1;

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		addToCart(state, action) {
			return {
				...state,
				orders: state.orders.map(order => 
					order.id === action.payload.id ? { ...action.payload, selected: true } : order,
				),
			};
		},
		addQuantity(state, action) {
			const { menuId } = action.payload;
			if (state.quantityById[menuId] === undefined) {
				return {
					...state,
					quantityById: {
						...action.quantityById,
						[menuId]: initAmt + 1,
					}
				};
			} else {
				return {
					...state,
					quantityById: {
						...action.quantityById,
						[menuId]: action.quantityById[menuId] + 1,
					}
				};
			}
		}
	}
});

export const { addToCart, addQuantity } = ordersSlice.actions;

export default ordersSlice.reducer;