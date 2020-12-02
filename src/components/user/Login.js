import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(4),
		'& > *': {
			padding: theme.spacing(5),
		},
	},
	verticalCenter: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	boldFont: {
		fontWeight: 'bold',
		marginBottom: theme.spacing(4),
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		'& > *': {
			width: 350,
			margin: theme.spacing(1),
		}
	},
	footer: {
		marginTop: theme.spacing(3),
	},
	errorMsg: {
		borderRadius: 5,
		borderWidth: 1, borderColor: 'indianred', borderStyle: 'solid',
		background: '#ffaeae',
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 10, paddingBottom: 10,
	},
	smaller: {
		fontSize: 11,
	}
}));

const Login = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [user, setUser] = useState({
		email: '',
		password: ''
	});
	const [invalidInput, setInvalidInput] = useState(false);

	const handleData = (e) => {
		setUser({
			...user,
			[e.currentTarget.name]: e.currentTarget.value
		});
	};

	const onSubmit = () => {
		if (user.email === '' || user.password === '') {
			setInvalidInput(true);
		} else {
			Axios.post('/api/user/login', user)
			.then(res => {
				console.log(props.history);
				dispatch(loginUser(res.data));
				props.history.push('/');
			})
			.catch(err => {
				setInvalidInput(true);
				console.log(err);
			});
		}
	};

	return (
		<div className={`${classes.root} ${classes.verticalCenter}`}>
			<Paper className={classes.verticalCenter}>
				<Typography className={classes.boldFont} component="h4">Login</Typography>
				<form className={classes.form}>
					{invalidInput && 
						(<div className={classes.errorMsg}>
							<Typography className={classes.smaller}>Invalid email or password</Typography>
						</div>)
					}
					<TextField 
						required
						error={invalidInput}
						id="email-input"
						name="email"
						label="Email"
						variant="outlined"
						onChange={handleData}
						// helperText={invalidInput ? "Please enter your email" : ""}
					/>
					<TextField 
						required
						error={invalidInput}
						id="password-input"
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						onChange={handleData}
						// helperText={invalidInput ? "Please enter your password" : ""}
					/>

					<Button onClick={onSubmit} variant="outlined" color="primary">LOG IN</Button>
				</form>
				<div className={classes.footer}>
					<Typography variant="body2">Don't have an account? <Link to="signup">Sign Up Now</Link></Typography>
				</div>
			</Paper>
		</div>
	);
};

export default Login;