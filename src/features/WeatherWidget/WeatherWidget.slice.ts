import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import moment from 'moment';
import { fetchForecast } from './WeatherWidget.api';

export enum RequestStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    FAILED = 'failed'
}

type WeatherWidgetState = {
  city: string,
  temperature: number,
  temperatureUnits: string,
  description: string,
  forecast: Array<ForecastItem>,
  date: string,
  time: string,
  fetchForecastRequestStatus: RequestStatus
}

const initialWeatherWidgetState: WeatherWidgetState = {
  city: 'Tampa',
  temperature: 70,
  temperatureUnits: 'metric',
  description: 'Clear',
  forecast: [],
  date: moment().format('dddd, MMM Do YYYY'),
  time: moment().format('LT'),
  fetchForecastRequestStatus: RequestStatus.IDLE
};

export type Coordinates = {
  lon: number,
  lat: number
}

export type GeographicLocation = Coordinates | string;

type ForecastData = {
  city: string,
  date: string,
  time: string,
  temperature: number,
  forecast: Array<ForecastItem>,
  description: 'string'
}

type ForecastItem = {
  time: string,
  description: string,
  temperature: number,
  precipitation: number,
  temperatureUnits: string,
  iconId: string
}

export const getForecast = createAsyncThunk(
  'weatherWidget/fetchForecast',
  async (payload: {
    location: GeographicLocation,
    temperatureUnits: string
  }) => {
    const response = await fetchForecast(payload.location, payload.temperatureUnits);
    const currentForecast = response.list[0];
    const forecastData: ForecastData = {
      city: response.city.name,
      date: moment.unix(currentForecast.dt).format('dddd, MMM Do YYYY'),
      time: moment().format('LT'),
      temperature: Math.round(currentForecast.main.temp),
      forecast: response.list.map((item: { dt: number; weather: { main: any, id: any; }[]; main: { temp: number; }; pop: any; }) => {
        return {
          time: moment.unix(item.dt).format('ha'),
          description: item.weather[0].main,
          temperature: Math.round(item.main.temp),
          precipitation: item.pop,
          temperatureUnits: payload.temperatureUnits,
          iconId: item.weather[0].id
        };
      }),
      description: currentForecast.weather[0].main
    };
    return forecastData;
  }
);

export const WeatherWidgetSlice = createSlice({
  name: 'weatherWidget',
  initialState: initialWeatherWidgetState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getForecast.pending, state => {
        state.fetchForecastRequestStatus = RequestStatus.LOADING;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.fetchForecastRequestStatus = RequestStatus.IDLE;
        state.city = action.payload.city;
        state.date = action.payload.date;
        state.time = action.payload.time;
        state.temperature = action.payload.temperature;
        state.forecast = action.payload.forecast;
        state.description = action.payload.description
      })
      .addCase(getForecast.rejected, state => {
        state.fetchForecastRequestStatus = RequestStatus.FAILED;
      })
  }
});

export default WeatherWidgetSlice.reducer;
