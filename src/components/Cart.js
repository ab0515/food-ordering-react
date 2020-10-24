import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { mergeClasses } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
	buttons: {
		display: 'flex',
	},
	list: {
		display: 'flex',
	}
});

const Cart = () => {
	const orders = useSelector(state => state.orders.orders);
	const classes = useStyles();

	console.log(orders);

	const handleOnPlus = (e) => {
		let i = e.currentTarget.getAttribute("data-key");
		orders[i].quantity += 1;
	};

	const handleOnMinus = (e) => {
		let i = e.currentTarget.getAttribute("data-key");
		orders[i].quantity -= 1;
	};

	const orderList = (
		<ul>
			{ 
				orders.map((item, idx) => 
					<li key={item.id}>
						<div className={mergeClasses.buttons}>
							<Button data-key={idx} variant="contained" onClick={handleOnPlus}><AddIcon /></Button>
							<span className={classes.quantity}>{item.quantity}</span>
							<Button data-key={idx} variant="contained" onClick={handleOnMinus}><RemoveIcon /></Button>
						</div>
						{item.name}
					</li>
				)
			}
		</ul>
	);

	return (
		<div>
			<Typography variant="h4">Your order</Typography>
			<Typography variant="body1">{orders.length > 0 ? 'From ' + orders[0].restName : ''}</Typography>

			<div className={classes.list}>
				{orderList}
			</div>
		</div>
	);
};

export default Cart;