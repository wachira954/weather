import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Weather {
    
        city: string;
        temperature: number;
        description: string;
        condition: string;
        feelsLike: number;
        humidity: number;
        windSpeed: number;
       
}

interface WeatherState {
  data: Weather | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const API_KEY = ''; 
export const fetchWeather = createAsyncThunk<Weather, string>(
    'weather/fetchWeather',
    async (city: string) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5c01b2bfc6e495b3e4802cb50bb6955a`

    );
    return {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        condition: response.data.weather[0].main,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
    } as Weather;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch weather data.';
      });
  },
});

export default weatherSlice.reducer;