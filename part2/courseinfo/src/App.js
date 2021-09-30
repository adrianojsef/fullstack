import { courses } from './datasets/courses';
import Course from './components/Course';
import Header from './components/Header';

function App() {
	return (
		<>
			<Header text="Web development curriculum" />
			{courses.map(course => <Course key={course.id} course={course} />)}
		</>
	);
}

export default App;
