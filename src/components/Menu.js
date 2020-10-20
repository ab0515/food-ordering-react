import React from 'react';
import { useParams } from 'react-router-dom';

const Menu = (props) => {
	let { restName } = useParams();
	return (
		<div>
			{restName}
		</div>
	);
};

export default Menu;