import StatisticLine from "./StatisticLine";
import React from "react";

const Statistics = ({stats}) => {
	return (
		<table>
			<tbody>
				{stats.map(stat => <StatisticLine key={stat.text} text={stat.text} value={stat.value} />)}
			</tbody>
		</table>
	);
};

export default Statistics;