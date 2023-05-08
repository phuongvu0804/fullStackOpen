import React, { useEffect, useState } from "react";
import GeoService from "../services/geoService";
import weatherService from "../services/weatherService";

const CountryData = ({ data }) => {
  const [weather, setWeather] = useState({
    temp: null,
    wind: null,
  })

  useEffect(() => {
    GeoService
      .getGeo(data.capital)
      .then(data => {
        return {lon: data[0].lon, lat: data[0].lat}
      })
      .then((data) => {
        weatherService
          .getWeather(data)
          .then(data => {
            setWeather({
              ...weather,
              temp: (data.main.temp - 273.15).toFixed(2),
              wind: data.wind.speed,
              icon: data.weather[0].icon
            })
          })
      })
  }, [])

  const getLanguages = () => {
    const languages = Object.values(data.languages)
    return languages.map((language, i) => <li key={i}>{language}</li>)
  }
  return (
    <div>
      <h2>{data.name.common}</h2>

      <div>
        <p>Capital: {data.capital.toString()}</p>
        <p>Area: {data.area}</p>
      </div>

      <div>
        <h4>Languages</h4>
        {getLanguages()}
      </div>

      <div>
        <h4>Weather in {data.capital}</h4>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
        <p>Temperature: {weather.temp} Celsius</p>
        <p>Wind: {weather.wind} m/s</p>
      </div>
    </div>
  );
};

export default CountryData;
