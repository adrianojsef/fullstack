import axios from 'axios';
import React, { useEffect, useState } from "react";

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const api_key = process.env.REACT_APP_API_KEY;
	
	useEffect(() => {
		if (!weather || country?.name.common !== weather?.name) {
			axios
				.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.latlng[0]},${country.latlng[1]}&units=m`)
				.then(response => {
					console.log(response.data);
					setWeather(response.data);
				})
				.catch(error => {
					console.log('error', error);
					setWeather({});
				});
		}
	},[country]);

	return (
		<>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>population {country.population}</p>
			<h2>Spoken languages</h2>
			<ul>
				{Object.keys(country.languages).map(language => <li key={language}>{country.languages[language]}</li>)}
			</ul>
			<img height="200px" src={country.flags.svg} alt="flag" />
			<h2>Weather in {country.name.common}</h2>
			<p><strong>temperature:</strong> {!weather ? '' : weather.current.temperature} Celsius</p>
			<img height="100px" src={!weather ? '' : weather.current.weather_icons[0]} alt="weather" />
			<p><strong>wind:</strong> {!weather ? '' : weather.current.wind_speed} km direction {!weather ? '' : weather.current.wind_dir}</p>
		</>
	);
};

export default Country;