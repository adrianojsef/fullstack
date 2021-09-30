import Title from "./Title";
import Paragraph from "./Paragraph";
import React from "react";

const AnecdoteStats = ({title, anecdote, votes}) => {
	const votesString = () => {
		return "has " + votes + " votes";
	}

	return (
		<>
			<Title text={title} />
			<Paragraph text={anecdote} />
			<Paragraph text={votesString()} />
		</>
	);
};

export default AnecdoteStats;