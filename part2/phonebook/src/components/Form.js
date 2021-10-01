import React from "react";
import Input from "./Input";

const Form = ({ action, fields, buttonLabel }) => {
	return (
		<form onSubmit={action}>
			{fields.map(field => <Input key={field.id} label={field.name} name={field.name} value={field.value} handler={field.handler} />)}
			<br />
			<button type="submit">{buttonLabel}</button>
		</form>
	);
};

export default Form;