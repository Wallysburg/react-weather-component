import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CurrentWeather from './components/CurrentWeather';
import WeatherLocation from './components/WeatherLocation';
import Date from './components/Date';
import WeatherForecast from './components/WeatherForecast';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import styles from './WeatherWidget.module.css';
import {
  getForecast, updateTime
} from './WeatherWidget.slice';

const WeatherWidget = () => {
  const dispatch = useAppDispatch();

  useEffect(function getCurrentWeatherDataOnMount() {
    dispatch(getForecast({
      location: 'Tampa',
      temperatureUnits: 'imperial'
    }))
  }, [dispatch]);

  useEffect(function updateTimeEveryMinute() {
    const timer = setTimeout(() => {
      dispatch(updateTime())
    }, 1000 * 60);
    return () => clearTimeout(timer);
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
