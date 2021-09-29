import Title from './components/Title';
import Actions from './components/Actions';
import Statistics from './components/Statistics';
import React, {useState} from 'react';

const ShowStatistics = ({stats}) => {
	if (stats.length === 0) {
		return <p>No feedback given</p>;
	}

	return <Statistics stats={stats} />;
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const getAll = function() {
		return good + neutral + bad;
	}

	const getAverage = function() {
		const average = (good - bad) / getAll();
	
		return isNaN(average) ? 0 : average;
	}

	const getPositive = function() {
		const positive = (good / getAll() * 100);
	
		return isNaN(positive) ? '0 %' : positive + ' %';
	}

	const actions = [
		{ text: 'good', onClick: () => setGood(good + 1) },
		{ text: 'neutral', onClick: () => setNeutral(neutral + 1) },
		{ text: 'bad', onClick: () => setBad(bad + 1) }
	];

	const statistics = getAll() === 0 ? [] : [
		{ text: 'good', value: good },
		{ text: 'neutral', value: neutral },
		{ text: 'bad', value: bad },
		{ text: 'all', value: getAll() },
		{ text: 'average', value: getAverage() },
		{ text: 'positive', value: getPositive() }
	];

	return (
		<>
			<Title text="give feedback" />
			<br />
			<Actions actions={actions} />
			<br />
			<Title text="statistics" />
			<br />
			<ShowStatistics stats={statistics}/>
		</>
	);
}

export default App;
