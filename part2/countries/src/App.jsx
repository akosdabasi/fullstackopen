import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import API_KEY from "./secrets";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

function App() {
  const [results, setResults] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get(`${baseURL}/all`).then((res) => {
      console.log(res.data[12]);
      setCountries(res.data);
      setResults(res.data);
    });
  }, []);

  useEffect(() => {
    if (results.length !== 1) return;
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${results[0].capital}&aqi=no`
      )
      .then((res) => {
        console.log(res.data);
        const { temp_c, wind_kph, precip_mm, condition } = res.data.current;
        setWeather({ temp_c, wind_kph, precip_mm, condition });
      });
  }, [results]);

  const handleSearchChange = (e) => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleOnClick = (cca3) => {
    setResults([countries.find((country) => country.cca3 === cca3)]);
  };

  const renderCountries = () => {
    if (!results.length) return null;
    if (results.length === 1) {
      const { name, capital, area, languages, flags, population } = results[0];

      return (
        <div>
          <h1>{name.common}</h1>
          <div>capital {capital}</div>
          <div>area {area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.entries(languages).map(([key, lang]) => (
              <li key={key}>{lang}</li>
            ))}
          </ul>
          <img src={flags.png} />
          <div>population: {population}</div>
          <h2>Weather</h2>
          <img src={`https:${weather.condition.icon}`} />
          <div>temp: {weather.temp_c}</div>
          <div>wind: {weather.wind_kph}</div>
          <div>precip: {weather.precip_mm}</div>
        </div>
      );
    }
    if (results.length > 1 && results.length <= 10)
      return results.map((country) => (
        <div key={country.cca3}>
          {country.name.common}{" "}
          <button onClick={() => handleOnClick(country.cca3)}>show</button>
        </div>
      ));
    else return <div>Too many results to show. Specify your search</div>;
  };

  return (
    <>
      <div>
        find countries:{" "}
        <input id="searchField" type="text" onChange={handleSearchChange} />
      </div>
      {renderCountries()}
    </>
  );
}

export default App;
