import Part from './Part';
import React from 'react';

const Content = ({parts}) => {
	return (
		<>
			{parts.map(part => <Part name={part.name} exercises={part.exercises} />)}
		</>
	);
}

export default Content