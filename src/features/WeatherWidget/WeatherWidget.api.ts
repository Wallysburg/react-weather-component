import { GeographicLocation } from "./WeatherWidget.slice";

const WEATHER_API_KEY = 'b1827b6fcba1f7f6bddae0425c68b2a8';

export const fetchForecast = async (location: GeographicLocation, temperatureUnits: string) => {
  let forecastUrl = '';

  if (typeof location === 'string') {
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${temperatureUnits}&appid=${WEATHER_API_KEY}`;
  } else {
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${temperatureUnits}&appid=${WEATHER_API_KEY}`;
  }
  const response = await fetch(forecastUrl);
  const json = await response.json();
  return json;
};
