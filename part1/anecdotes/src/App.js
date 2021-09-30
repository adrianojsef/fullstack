import {phrases} from "./datasets/phrases";
import Actions from "./components/Actions";
import AnecdoteStats from "./components/AnecdoteStats";
import React, { useState } from "react";

const indexOfMax = (numbers) => {
	if (numbers.length === 0) {
		return -1;
	}

	let max = numbers[0];
	let index = 0;

	for (let i = 1; i < numbers.length; i++) {
		if (numbers[i] > max) {
			max = numbers[i];
			index = i;
		}
	}

	return index;
} 

function App() {
	const [votes, setVotes] = useState(new Array(phrases.length).fill(0));
	const [anecdote, setAnecdote] = useState(0);

	const actions = [
		{ text: 'vote', onClick: () => {
			votes[anecdote]++;
			setVotes([...votes]);
		}},
		{ text: 'next anecdote', onClick: () => setAnecdote(Math.floor(Math.random() * phrases.length)) }
	];

	const mostVotes = () => {
		const mostVoted = indexOfMax(votes);

		return <AnecdoteStats title="Anecdote with most votes" anecdote={phrases[mostVoted]} votes={votes[mostVoted]} />;
	}

	return (
		<>
			<AnecdoteStats title="Anecdote of the day" anecdote={phrases[anecdote]} votes={votes[anecdote]} />
			<Actions actions={actions} />
			<br />
			{mostVotes()}
		</>
	);
}

export default App;
