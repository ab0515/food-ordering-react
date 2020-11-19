import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import restData from '../data/restaurants.json';

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

	const [ restaurants, setRestaurants ] = useState([]);

	useEffect(() => {
		let isCancelled = false;
		// axios.get('/api/restaurant/getAllRestaurants')
		// 	.then(res => {
		// 		if (res.data.success) {
		// 			setRestaurants(res.data.rest);
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.error(err);
		// 	});
		const runAsync = async () => {
			try {
				if (!isCancelled) {
					let res = await axios.get('/api/restaurant/getAllRestaurants');
					setRestaurants(res.data.rest);
				}
			} catch (e) {
				if (!isCancelled) {
					throw e;
				}
			}
		}

		runAsync();

		return () => isCancelled = true;
	}, []);

	const handleCardClick = (e) => {
		// history.push("/")
		let key = e.currentTarget.getAttribute("data-key");
		let idx = restaurants.findIndex(item => item._id === key);
		// console.log(idx);
		history.push({
			pathname: `/restaurant/${restaurants[idx].name}`,
			state: { id: key }
		});
	};

	// const CardRests = restData.map(item => 
	const CardRests = restaurants.map(item =>
		<Card key={item._id} data-key={item._id} className={classes.restCard} onClick={handleCardClick}>
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