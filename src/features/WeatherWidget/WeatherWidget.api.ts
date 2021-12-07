import { GeographicLocation } from "./WeatherWidget.slice";

export const fetchForecast = async (location: GeographicLocation) => {
  let forecastUrl = '';

  if (typeof location === 'string') {
    forecastUrl = `/api/weather?city=${location}`;
  } else {
    forecastUrl = `/api/weather?lat=${location.lat}&lon=${location.lon}`;
  }
  const response = await fetch(forecastUrl);
  const json = await response.json();
  return json;
};
