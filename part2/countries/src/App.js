import axios from 'axios';
import Input from './components/Input';
import Result from './components/Result';
import React, { useEffect, useState } from "react";

function App() {
	const [search, setSearch] = useState('');
	const [countries, setCountries] = useState([]);
	const [countriesFound, setCountriesFound] = useState([]);

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => setCountries(response.data));
	}, []);

	const searchCountries = (searchTerm) => {
		const specificCountry = countries.find(country => country.name.common.toLowerCase() === searchTerm.toLowerCase());
		const countriesFound = !specificCountry ? countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) : [specificCountry];

		setSearch(searchTerm);
		setCountriesFound(countriesFound);
	};

	return (
		<>
			<Input label="find countries" name="search" value={search} onChange={(searchTerm) => searchCountries(searchTerm)} />
			<Result countries={countriesFound} onClick={(searchTerm) => searchCountries(searchTerm)} />
		</>
	);
}

export default App;
