import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: '#cce3de',
	},
	appLogo: {
		fontSize: 25,
		textDecoration: 'none',
		color: '#2b2d42',
		fontWeight: 'bold',
	},
	taps: {
		listStyleType: 'none',
	}
});

const NavBar = () => {
	const classes = useStyles();

	return (
		<nav className={classes.navWrapper}>
			<div className={classes.container}>
				<Link to="/" className={classes.appLogo}>FoodOrdering</Link>

				<ul className={classes.taps}>
					<li><Link to="/cart">My cart <ShoppingCartIcon /></Link></li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;