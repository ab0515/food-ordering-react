import React from 'react';
import { useSelector } from 'react-redux';

import { Typography, Select, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		padding: 20
	},
	formControl: {
		margin: theme.spacing(1),
		maxWidth: 120
	},
	orderList: {
		display: 'flex',
		alignItems: 'center'
	},
	select: {
		paddingRight: 24,
		paddingTop: 12,
		paddingBottom: 12,
	},
	menuName: {
		paddingLeft: 12,
		fontSize: 20,
		fontWeight: 18,
	}
}));

const Cart = () => {
	const quantities = Array.from({ length: 50 }, (_, i) => i+1 );
	const orders = useSelector(state => state.orders.orders);
	const classes = useStyles();

	const quantityOptions = quantities.map((q, i) => (
		<option key={i} value={i}>{q}</option>
	));

	return (
		<div className={classes.container}>
			<Typography variant="h4">Your order</Typography>
			<div className={classes.orderList}>
				{
					orders.map((item, i) => { 
						return item.selected ? (
							<React.Fragment key={item.id}>
								<FormControl variant="outlined" className={classes.formControl}>
									<Select 
										native
										inputProps={{ name: 'quantities', id: 'outlined-quantities-native' }}
										className={classes.select}
									>
										{quantityOptions}
									</Select>
								</FormControl>

								<span className={classes.menuName}>{item.name}</span>	
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