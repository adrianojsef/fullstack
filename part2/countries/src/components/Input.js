import React from "react";

const Input = ({ label, name, value = '', type = 'text', onChange }) => {
	return (
		<>
			<label>{label}</label>
			{' '}
			<input
				name={name}
				value={value}
				type={type}
				onChange={(event) => onChange(event.target.value)}
			/>
		</>
	);
};

export default Input;