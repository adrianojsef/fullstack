import Country from "./Country";
import React from "react";

const Result = ({ countries, onClick }) => {
	if (countries.length == 0) {
		return <p>There are no countries to show</p>
	}

	if (countries.length == 1) {
		return <Country country={countries[0]} />
	}

	if (countries.length <= 10) {
		return (
			<>
				{countries.map((country) => {
					return (
						<div key={country.cca3}>
							{country.name.common}
							{' '}
							<button onClick={() => onClick(country.name.common)}>show</button>
						</div>
					);
				})}
			</>
		);
	}

	return <p>Too many matches, specify another filter</p>
}

export default Result;