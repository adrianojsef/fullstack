import React from "react";

const Input = ({ label, name, value = '', handler }) => {
	return (
		<div>
			<label>{label}:</label><input name={name} value={value} onChange={handler} />
		</div>
	);
}

export default Input;