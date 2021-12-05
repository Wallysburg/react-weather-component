const WEATHER_API_KEY = 'b1827b6fcba1f7f6bddae0425c68b2a8';

export const fetchCurrentWeather = async (city: string, temperatureUnits: string) => {
  const locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnits}&appid=${WEATHER_API_KEY}`;

  const response = await fetch(locationUrl);
  const json = await response.json();
  return json;
};

export const fetchForecast = async (city: string, temperatureUnits: string) => {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${temperatureUnits}&appid=${WEATHER_API_KEY}`;
  const response = await fetch(forecastUrl);
  const json = await response.json();
  return json;
};
