import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
			backgroundColor: "#ffccbc"
		},
		boxShadow: 3,
		cursor: "pointer",
	},
	list: {
		maxWidth: 500,
	},
	title: {
		fontWeight: "bold",
	}
});

const Menu = (props) => {
	let { restName } = useParams();
	const classes = useStyles();
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

	const menuList = menuItems.map(item => 
			<Card key={item.id} className={classes.card}>
				<CardContent>
					<Typography variant="subtitle1" className={classes.title}>{item.name}</Typography>
					<Typography variant="body2" color="textSecondary">{item.description}</Typography>
					<Typography variant="body1">${item.price}</Typography>
				</CardContent>
			</Card>
		);

	return (
		<div className={classes.main}>
			<Typography variant="h5">{restName}</Typography>
			<div className={classes.list}>
				{menuList}
			</div>
		</div>
	);
};

export default Menu;