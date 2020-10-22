import React from 'react';

import { useSelector } from 'react-redux';

const Cart = () => {
	const orders = useSelector(state => state.orders);

	const orderList = (
		<ul>
			{ 
				orders.map(item => 
					<li key={item.id}>{item.name}</li>
				)
			}
		</ul>
	);

	return (
		<div>
			Your shopping cart

			{orderList}
		</div>
	);
};

export default Cart;