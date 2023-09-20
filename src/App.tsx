import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, Weather } from './redux/weatherSlice'; 
import './App.css';
import { RootState } from './redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloud,
  faCloudShowersHeavy,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const weatherData: Weather | null = useSelector((state: RootState) => state.weather.data);
  const loading: boolean = useSelector((state: RootState) => state.weather.loading);
  const error: string | null = useSelector((state: RootState) => state.weather.error);
  const dispatch = useDispatch();

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

  const handleFetchWeather = async () => {
    if (city) {
      await dispatch(fetchWeather(city) as any); 
      setCity('');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleFetchWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>
      
      {weatherData && (
 
  <div className="container">
    <div className="top">
      <div className="city">
        <p>{weatherData.city}</p>
      </div>
      <div className="temp">
        <p>{weatherData.temperature.toFixed()} °C</p>
        <div className='description'>
          <FontAwesomeIcon icon={getWeatherIcon(weatherData.condition)} />
          <p>{weatherData.description}</p>
        </div>
      </div>
    </div>
    <div className="bottom">
      <div className="feels">
        <p className="bold">{weatherData.feelsLike.toFixed()}°F</p>
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        <p className="bold">{weatherData.humidity}%</p>
        <p>Humidity</p>
      </div>
      <div className="wind">
        <p className="bold">{weatherData.windSpeed} km/h</p>
        <p>Wind Speed</p>
      </div>
    </div>

  </div>
)}
    
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
