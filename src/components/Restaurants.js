import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import restData from '../data/restaurants.json';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: 300,
		paddingRight: 300
	},
	restCard: {
		marginTop: 15,
		cursor: 'pointer',
		"&:hover": {
			backgroundColor: "#cfd8dc"
		},
		boxShadow: 3
	}
});

/* a view showing a list of restaurants */
const Restaurants = () => {
	const classes = useStyles();
	const history = useHistory();

	// const rests = [
	// 	{
	// 		id: 1,
	// 		name: 'Restaurant 1',
	// 		category: 'Fast Food'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Restaurant Cafe 2',
	// 		category: 'Dessert'
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Blah Blah Coffee',
	// 		category: 'Dessert'
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'Delicious Pizza',
	// 		category: 'Pizza'
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Omega Chicken',
	// 		category: 'Chicken'
	// 	}
	// ];

	const handleCardClick = (e) => {
		// history.push("/")
		let key = e.currentTarget.getAttribute("data-key");
		let idx = restData.findIndex(item => item.id.toString() === key);
		// console.log(idx);
		history.push(`/${restData[idx].name}`);
	};

	const CardRests = restData .map(item => 
		<Card key={item.id} data-key={item.id} className={classes.restCard} onClick={handleCardClick}>
			<CardContent>
				<Typography variant="h5">{item.name}</Typography>
				<Typography variant="body2" component="p">{item.category}</Typography>
			</CardContent>
		</Card>
	);

	return (
		<div className={classes.root}>
			{CardRests}
		</div>
	);

};

export default Restaurants;