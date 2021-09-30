import React from 'react';

const Header = ({level = 1, text}) => {
	const CustomHeader = `h${level}`;

	return (
		<CustomHeader>{text}</CustomHeader>
	);
};

export default Header;
