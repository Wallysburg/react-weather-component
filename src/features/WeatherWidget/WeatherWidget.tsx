import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CurrentWeather from './components/CurrentWeather';
import WeatherLocation from './components/WeatherLocation';
import Date from './components/Date';
import WeatherForecast from './components/WeatherForecast';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './WeatherWidget.module.css';
import {
  getForecast
} from './WeatherWidget.slice';

const WeatherWidget = () => {
  const dispatch = useAppDispatch();

  useEffect(function getCurrentWeatherDataOnMount() {
    dispatch(getForecast({
      location: 'Tampa',
      temperatureUnits: 'imperial'
    }))
  }, [dispatch]);

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
