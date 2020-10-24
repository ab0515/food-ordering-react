import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MenuItem from './MenuItem';

import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { addToCart } from '../features/orders/ordersSlice';
import menuItems from '../data/menuItems.json';

const useStyles = makeStyles({
	main: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	list: {
		maxWidth: 500,
	},
	dialogFooter: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	quantity: {
		paddingLeft: 10,
		paddingRight: 10,
	}
});

const Menu = () => {
	let { restName } = useParams();
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const handleOpen = (e) => {
		let key = e.currentTarget.getAttribute("data-key");
		let idx = menuItems.findIndex(item => item.id === key);
		setSelectedMenu(idx);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddToCart = () => {
		const item = {
			...menuItems[selectedMenu],
			quantity
		};
		dispatch(
			addToCart(item)
		);
		setOpen(false);
	};

	const handleOnPlus = () => setQuantity(quantity+1);
	const handleOnMinus = () => {
		if (quantity > 0) {		// no minus quantity allowed
			setQuantity(quantity-1);
		}
	};

	const dialog = (
		<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="dialog-title"
				maxWidth="sm"
				dividers
			>
			<DialogTitle id="dialog-title">{menuItems[selectedMenu].name}</DialogTitle>
			<DialogContent dividers>
				{menuItems[selectedMenu].description}
			</DialogContent>
			<DialogActions className={classes.dialogFooter}>
				<div>
					<Button variant="contained" onClick={handleOnPlus}><AddIcon /></Button>
					<span className={classes.quantity}>{quantity}</span>
					<Button variant="contained" onClick={handleOnMinus}><RemoveIcon /></Button>
				</div>
				<Button variant="contained" color="primary" disabled={quantity === 0} onClick={handleAddToCart}>
					Add menu ${(menuItems[selectedMenu].price * quantity).toFixed(2)}
				</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<div className={classes.main}>
			<Typography variant="h5">{restName}</Typography>
			<div className={classes.list}>
				{
					menuItems.map(item => (
						<MenuItem item={item} onClick={handleOpen} />
					))
				}
			</div>

			{dialog}
		</div>
	);
};

export default Menu;