import React, { useState } from 'react';

import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudShowersHeavy,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import {WeatherData} from "../store/types"


// interface WeatherData {
//   name?: string;
//   main?: {
//     temp: number;
//     feels_like: number;
//     humidity: number;
//   };
//   weather?: { main: string }[];
//   wind?: { speed: number };
// }

interface WeatherProps {
    Data: WeatherData;
  }

function App = ({WeatherProps}) {
  
    const fahrenheit = (Data.main.temp * 1.8 - 459.67).toFixed(2);
    const celsius = (Data.main.temp - 273.15).toFixed(2);

  const getWeatherIcon = (condition: string): any => {
    switch (condition) {
      case 'Clear':
        return faSun;
      case 'Clouds':
        return faCloud;
      case 'Rain':
        return faCloudShowersHeavy;
      default:
        return faQuestionCircle;
    }
  };

 

//   const convertTemperature = (temperature: number, unit: string): number => {
//     if (unit === 'celsius') {
//       return temperature;
//     } else if (unit === 'fahrenheit') {
//       return (temperature * 9) / 5 + 32;
//     }
//     return temperature;
//   };

  
//   const convertWindSpeed = (speed: number, unit: string): number => {
//     if (unit === 'kmh') {
//       return speed * 3.6; 
//     } else if (unit === 'mph') {
//       return speed * 2.237;
//     }
//     return speed; 
//   };

 
//   const convertPrecipitation = (precipitation: number, unit: string): number => {
//     if (unit === 'mm') {
//       return precipitation;
//     } else if (unit === 'in') {
//       return precipitation * 0.0393701;
//     }
//     return precipitation; 
//   };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={setLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="unit-controls">
        <button
          onClick={() => setTemperatureUnit('celsius')}
          className={temperatureUnit === 'celsius' ? 'active' : ''}
        >
          Celsius
        </button>
        <button
          onClick={() => setTemperatureUnit('fahrenheit')}
          className={temperatureUnit === 'fahrenheit' ? 'active' : ''}
        >
          Fahrenheit
        </button>
        <button
          onClick={() => setWindSpeedUnit('kmh')}
          className={windSpeedUnit === 'kmh' ? 'active' : ''}
        >
          km/h
        </button>
        <button
          onClick={() => setWindSpeedUnit('mph')}
          className={windSpeedUnit === 'mph' ? 'active' : ''}
        >
          mph
        </button>
        <button
          onClick={() => setPrecipitationUnit('mm')}
          className={precipitationUnit === 'mm' ? 'active' : ''}
        >
          mm
        </button>
        <button
          onClick={() => setPrecipitationUnit('in')}
          className={precipitationUnit === 'in' ? 'active' : ''}
        >
          in
        </button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{Data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {(Data.main.temp).toFixed()}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
              </h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? (
              <>
                <FontAwesomeIcon icon={getWeatherIcon(data.weather[0].main)} />
                <p>{data.weather[0].main}</p>
              </>
            ) : null}
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {data.name !== undefined && !loading && !error && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {convertTemperature(data.main.feels_like, temperatureUnit).toFixed()}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">
                  {convertWindSpeed(data.wind.speed, windSpeedUnit).toFixed()} {windSpeedUnit === 'kmh' ? 'km/h' : 'mph'}
                </p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
