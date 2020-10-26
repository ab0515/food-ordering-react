import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, NativeSelect, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		padding: 20
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	orderList: {
		display: 'flex',
		alignItems: 'center'
	}
}));

const Cart = () => {
	const quantities = Array.from({ length: 50 }, (_, i) => i+1 );
	const orders = useSelector(state => state.orders.orders);
	const classes = useStyles();

	const handleOnPlus = (e) => {
		let i = e.currentTarget.getAttribute("data-key");
		orders[i].quantity += 1;
	};

	const handleOnMinus = (e) => {
		let i = e.currentTarget.getAttribute("data-key");
		orders[i].quantity -= 1;
	};

	const quantityOptions = quantities.map((q, i) => (
		<option value={i}>{q}</option>
	));

	return (
		<div className={classes.container}>
			<Typography variant="h4">Your order</Typography>
			<div className={classes.orderList}>
			{
				orders.map((item, i) => { 
					return item.selected ? (
						<React.Fragment key={item.id}>
							<FormControl className={classes.formControl} variant="outlined">
								<NativeSelect 
									inputProps={{ name: 'quantities', id: 'outlined-quantities-native' }}
								>
									{quantityOptions}
								</NativeSelect>
							</FormControl>

							<span>{item.name}</span>	
						</React.Fragment>
					) : (
						null
					)
				})
			}
			</div>
		</div>
	);
};

export default Cart;