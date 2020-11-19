import React, { useState } from 'react';
import Axios from 'axios';
import Restaurants from './Restaurants';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select } from '@material-ui/core';

const useStyles = makeStyles({
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
});

const Admin = () => {
	const classes = useStyles();

	const [ openAddRest, setOpenAddRest ] = useState(false);
	const [ openMenu, setOpenMenu ] = useState(false);
	const [ rest, setRest ] = useState({
		name: '',
		category: ''
	});
	const Categories = [
		{ key: 0, value: 'Select a category' },
		{ key: 1, value: 'Canadian' },
		{ key: 2, value: 'Chicken' },
		{ key: 3, value: 'Fast Food' },
		{ key: 4, value: 'Korean' },
		{ key: 5, value: 'Medditerrenean' },
		{ key: 6, value: 'Italian' }
	];

	const onAddRestClick = () => {
		setOpenAddRest(true);
	};

	const onAddMenuClick = () => {
		setOpenMenu(true);
	}

	const onRestChange = (e) => {
		setRest({
			...rest,
			[e.currentTarget.id]: e.currentTarget.value
		});
	};

	const closeDialog = () => {
		setOpenAddRest(false);
	};

	const onSubmit = () => {
		console.log(rest);

		if (!rest.name || !rest.category) {
			return alert('Please complete the form first');
		}

		Axios.post('/api/restaurant/addRestaurant', rest)
			.then(res => {
				if (res.data.success) {
					alert('Restaurant successfully added');
					setOpenAddRest(false);
				} else {
					alert('Failed to add restaurant');
				}
			})
			.catch(err => {
				console.error(err);
			});
	};

	const addRestDialog = (
		<Dialog open={openAddRest} maxWidth="sm" fullWidth>
			<DialogTitle>Add a restaurant</DialogTitle>
			<DialogContent className={classes.form}>
				<TextField autoFocus
					id="name"
					label="Name"
					type="text"
					onChange={onRestChange}
				/>
				{/* <TextField 
					id="category"
					label="Category"
					type="text"
					onChange={onRestChange}
				/> */}
				<Select native
					name="category"
					onChange={onRestChange}
					inputProps={{
						id: 'category'
					}}
				>	
					{
						Categories.map((cat, i) => (
							<option key={cat.key} value={cat.value}>{cat.value}</option>
						))
					}
				</Select>
			</DialogContent>

			<DialogActions>
				<Button color="primary" onClick={closeDialog}>Close</Button>
				<Button color="primary" onClick={onSubmit}>Add</Button>
			</DialogActions>
		</Dialog>
	);

	return (
		<div>
			<Button variant="outlined" onClick={onAddRestClick}>Add Restaurant</Button>
			<Button variant="outlined" onClick={onAddMenuClick}>Add Menu Item</Button>

			{addRestDialog}

			<Restaurants />
		</div>
	);
};

export default Admin;