import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { orderAdded } from '../features/orders/ordersSlice';

const useStyles = makeStyles({
	main: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		marginTop: 20,
		"&:hover": {
			backgroundColor: "#eaf4f4"
		},
		boxShadow: 3,
		cursor: "pointer",
	},
	list: {
		maxWidth: 500,
	},
	title: {
		fontWeight: "bold",
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

	const menuItems = [
		{
			id: 1,
			name: 'Angel Hair Spaghetti',
			description: 'Aenean faucibus rhoncus cursus.',
			price: 17.24,
			weight: '450g'
		},
		{
			id: 2,
			name: 'Cream Pasta',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ac interdum arcu vulputate at.',
			price: 19.55,
			weight: '400g'
		},
		{
			id: 3,
			name: 'Carbonara Pasta',
			description: 'Donec pretium vulputate arcu, ac interdum arcu vulputate at.',
			price: 19.55,
			weight: '430g'
		},		
		{
			id: 4,
			name: 'Tiger Shrimp Penne Pasta',
			description: 'Aenean faucibus rhoncus cursus. Donec pretium vulputate arcu, ac interdum arcu vulputate at.',
			price: 22.49,
			weight: '430g'
		},
		{
			id: 5,
			name: 'Basil Pesto Pasta',
			description: 'Donec pretium vulputate arcu, ac interdum arcu vulputate at.',
			price: 19.89,
			weight: '430g'
		},
	];

	const handleOpen = (e) => {
		let key = e.currentTarget.getAttribute("data-key");
		let idx = menuItems.findIndex(item => item.id.toString() === key);
		setSelectedMenu(idx);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddToCart = () => {
		const menu = menuItems[selectedMenu];
		dispatch(
			orderAdded(menu)
		);
		setOpen(false);
	};

	const handleOnPlus = () => setQuantity(quantity+1);
	const handleOnMinus = () => {
		if (quantity > 0) {		// no minus quantity allowed
			setQuantity(quantity-1);
		}
	}

	const menuList = menuItems.map(item => 
			<Card key={item.id} data-key={item.id} className={classes.card} onClick={handleOpen}>
				<CardContent>
					<Typography variant="subtitle1" className={classes.title}>{item.name}</Typography>
					<Typography variant="body2" color="textSecondary">{item.description}</Typography>
					<Typography variant="body1">${item.price}</Typography>
				</CardContent>
			</Card>
	);

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
				{menuList}
			</div>

			{dialog}
		</div>
	);
};

export default Menu;