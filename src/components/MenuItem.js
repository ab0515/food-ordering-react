import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Typography, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles({
	title: {
		fontWeight: 'bold',
	},
	card: {
		marginTop: 20,
		"&:hover": {
			backgroundColor: "#eaf4f4"
		},
		boxShadow: 3,
		cursor: "pointer",
	},
	selected: {
		borderRadius: 1,
		borderStyle: 'solid',
		borderColor: 'green',
	}
	
})

const MenuItem = ({item, onClick}) => {
	const classes = useStyles();
	const menuItems = useSelector(state => state.orders.orders);

	return (
		<Card key={item.id} data-key={item.id} className={`${classes.card} ${item.selected ? classes.selected : ''}`} onClick={onClick}>
			<CardContent>
				<Typography variant="subtitle1" className={classes.title}>{item.name}</Typography>
				<Typography variant="body2" color="textSecondary">{item.description}</Typography>
				<Typography variant="body1">${item.price}</Typography>
			</CardContent>
		</Card>
	);
};

export default MenuItem;