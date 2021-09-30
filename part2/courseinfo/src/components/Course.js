import Header from './Header';
import Content from './Content';
import Total from './Total';
import React from 'react';

const Course = ({course}) => {
	return (
		<>
			<Header level="2" text={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
}

export default Course;