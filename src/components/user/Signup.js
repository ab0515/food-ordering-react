import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';

import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(4),
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(5),
	},
	text: {
		fontWeight: 'bold',
		padding: theme.spacing(2),
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& .MuiTextField-root, .MuiButton-root': {
			margin: theme.spacing(1),
			minWidth: 300,
		}
	},
	errorWrapper: {
		borderWidth: 1,
		borderColor: 'black',
		borderStyle: 'solid',
	},
	error: {
		color: 'red'
	},
	footer: {
		marginTop: theme.spacing(3),
	}
}));

const Signup = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [user, setUser] = useState({
		fullname: '',
		email: '',
		password: ''
	});
	const [failed, setFailed] = useState(false);
	const [invalidInput, setInvalidInput] = useState(false);

	const handleData = (e) => {
		setUser({
			...user,
			[e.currentTarget.name]: e.currentTarget.value
		});
	};

	const onSubmit = () => {
		/* avoid letting user to submit an empty form */
		if (user.fullname === '' || user.email === '' || user.password === '') {
			setInvalidInput(true);
		} else {
			Axios.post('/api/user/signup', user)
			.then(res => {
				if (res.success) {
					console.log('Successfully signed up');
					dispatch(loginUser(res.data));
				}
			})
			.catch(err => {
				setFailed(true);
				console.log(err);
			});
		}
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Typography component="h5" className={classes.text}>Sign up</Typography>
				{failed ? 
						<div className={classes.errorWrapper}>
							<Typography className={classes.error}>Incorrect email or password</Typography>
						</div> 
						: null
					}
				<form className={classes.form}>
					<TextField 
						required
						error={invalidInput}
						id="fullname-input"
						name="fullname"
						label="Full Name"
						variant="outlined"
						onChange={handleData}
						helperText={invalidInput ? "Please enter your full name" : ""}
					/>
					<TextField 
						required
						error={invalidInput}
						id="email-input"
						name="email"
						label="Email"
						variant="outlined"
						onChange={handleData}
						helperText={invalidInput ? "Please enter your email" : ""}
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
						helperText={invalidInput ? "Please enter your password" : ""}
					/>
					<Button onClick={onSubmit} variant="outlined" color="primary">SIGN UP</Button>
				</form>

				<div className={classes.footer}>
					<Typography variant="body2">Already a member? <Link to="/login">Log in</Link></Typography>
				</div>
			</Paper>
		</div>
	);
};

export default Signup;