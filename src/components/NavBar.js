import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
	navbar: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(2),
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: '#cce3de',
	},
	navbar__title: {
		fontSize: 25,
		textDecoration: 'none',
		color: '#2b2d42',
		fontWeight: 'bold',
		marginRight: 'auto',
	},
	navbar__item: {
		cursor: 'pointer',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	}
}));

const NavBar = () => {
	const classes = useStyles();
	const history = useHistory();

	const logOutHandler = () => {
		axios.get('/api/user/logout')
			.then(res => {
				if (res.status === 200) {
					history.push('/login');
				} else {
					alert('Fail to log out');
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	const LoggedInMenu = (
		<React.Fragment>
			<div className={classes.navbar__item}>My cart </div>
			<div className={classes.navbar__item} onClick={logOutHandler}>Log Out</div>
		</React.Fragment>
	);

	return (
		<header className={classes.navbar}>
			{/* <div className={classes.container}>
				<Link to="/" className={classes.appLogo}>FoodOrdering</Link>

				<ul className={classes.taps}>
					<li><Link to="/cart">My cart <ShoppingCartIcon /></Link></li>
					<li>Log Out</li>
				</ul>
			</div> */}
			<div className={classes.navbar__title}><Link to="/" className={classes.appLogo}>FoodOrdering</Link></div>
			{LoggedInMenu}
		</header>
	);
}

export default NavBar;