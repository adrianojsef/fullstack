import React from "react";

const Header = ({ level, text }) => {
	const CustomHeader = `h${level}`;

	return <CustomHeader>{text}</CustomHeader>;
}

export default Header;