import React from 'react';
import Card from '@material-ui/core/Card';
import CurrentWeather from './components/CurrentWeather';
import WeatherLocation from './components/WeatherLocation';
import Date from './components/Date';
import WeatherForecast from './components/WeatherForecast';
import styles from './WeatherWidget.module.css';

const WeatherWidget = () => {
  return (
    <Card
      variant='outlined'
      classes={{
        root: styles['weather-widget']
      }}
    >
      <WeatherLocation />
      <Date />
      <CurrentWeather />
      <WeatherForecast />
    </Card>
  )
};

export default WeatherWidget;
