import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudShowersHeavy,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';


interface WeatherData {
  name?: string;
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather?: { main: string }[];
  wind?: { speed: number };
}

function App() {
  const [data, setData] = useState<WeatherData>({});
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<string>('celsius'); 
  const [windSpeedUnit, setWindSpeedUnit] = useState<string>('kmh'); 
  const [precipitationUnit, setPrecipitationUnit] = useState<string>('mm'); 

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

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setLoading(true);
      axios
        .get(url)
        .then((response: AxiosResponse<WeatherData>) => { 
          setData(response.data);
          setError(null);
        })
        .catch((error: AxiosError) => { 
          setError(error.message);
          setData({});
        })
        .finally(() => {
          setLoading(false);
          setLocation('');
        });
    }
  };

  useEffect(() => {
   
  }, []);

  // Function to convert temperature to the selected unit
  const convertTemperature = (temperature: number, unit: string): number => {
    if (unit === 'celsius') {
      return temperature;
    } else if (unit === 'fahrenheit') {
      return (temperature * 9) / 5 + 32;
    }
    return temperature;
  };

  
  const convertWindSpeed = (speed: number, unit: string): number => {
    if (unit === 'kmh') {
      return speed * 3.6; 
    } else if (unit === 'mph') {
      return speed * 2.237;
    }
    return speed; 
  };

 
  const convertPrecipitation = (precipitation: number, unit: string): number => {
    if (unit === 'mm') {
      return precipitation;
    } else if (unit === 'in') {
      return precipitation * 0.0393701;
    }
    return precipitation; 
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
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
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                {convertTemperature(data.main.temp, temperatureUnit).toFixed()}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
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
