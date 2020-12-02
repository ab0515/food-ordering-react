import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../features/user/userSlice';

export default function (ComposedComponent) {
	function CheckAuth(props) {
		const dispatch = useDispatch();
		const [user, setUser] = useState('');

		useEffect(() => {
			let mounted = true;

			const fetchData = async () => {
				try {
					let res = await axios.get('/api/user/auth');
					let user = await res.data;
					dispatch(authUser(user));
					setUser(user);

					if (!user.isAuth || user.tokenExp < new Date()) {
						props.history.push('/login');
					}
				} catch (e) {
					console.log('Auth fetching error: ' + e);
				}
			};

			if (mounted) {
				fetchData();
				// axios.get('/api/user/auth')
				// 	.then(res => {
				// 		dispatch(authUser(res.data));
				// 		return res.data;
				// 	})
				// 	.then(user => {
				// 		if (!user.isAuth || user.tokenExp > new Date()) {
				// 			props.history.push('/login');
				// 		}
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 	});
			}

			return () => mounted = false;
		},[dispatch, props.history]);

		return (
			<React.Fragment>
				{user.isAuth && <ComposedComponent {...props} /> }
			</React.Fragment>
		);
	}

	return CheckAuth;
};