import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Dashboard = () => {
	const history = useHistory();

	const onAdminClick = () => {
		history.push('/admin');
	};

	const onUserClick = () => {
		history.push('/restaurants');
	}

	return (
		<div>
			<Button variant="outlined" color="default" onClick={onAdminClick}>Admin</Button>
			<Button variant="outlined" color="default" onClick={onUserClick}>User</Button>
		</div>
	)
};

export default Dashboard;