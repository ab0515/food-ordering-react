import React, {useEffect, useState} from 'react';
import Axios from 'axios';

const Restaurants = () => {
	const [ restaurants, setRestaurants ] = useState([]);

	useEffect(() => {
		Axios.get('/api/restaurant/getAllRestaurants')
			.then(res => {
				if (res.data.success) {
					console.log(res.data.rest);
					setRestaurants(res.data.rest);
				}
			})
			.catch(err => {
				console.error(err);
			})
	}, []);

	return (
		<div>
			{
				restaurants.map((item, i) => (
				<li key={item._id}>{item.name}</li>
				))
			}
		</div>
	)
};

export default Restaurants;