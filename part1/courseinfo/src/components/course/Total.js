import React from "react";

const Total = ({parts}) => {
	const exercises = parts.map(value => value.exercises);
	const reducer = (accumulator, current) => accumulator + current;
	const sum = exercises.reduce(reducer);

	return (
		<p>Number of exercises {sum}</p>
	);
}

export default Total;