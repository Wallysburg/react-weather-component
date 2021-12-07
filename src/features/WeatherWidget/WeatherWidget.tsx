import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CurrentWeather from './components/CurrentWeather';
import WeatherLocation from './components/WeatherLocation';
import Date from './components/Date';
import WeatherForecast from './components/WeatherForecast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import styles from './WeatherWidget.module.css';
import {
  completeInitialLoad,
  getForecast, updateTime
} from './WeatherWidget.slice';
import { CardContent, CircularProgress } from '@material-ui/core';

const WeatherWidget = () => {
  const dispatch = useAppDispatch();
  const initialLoad = useAppSelector(state => state.weatherWidget.initialLoad);

  useEffect(function getCurrentWeatherDataOnMount() {
    dispatch(getForecast({
      location: 'Tampa',
      temperatureUnits: 'imperial'
    }))
    .then(() =>{
      dispatch(completeInitialLoad())
    })
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
      {!initialLoad ?
      <CardContent>
        <CircularProgress size={80} thickness={1} color={'inherit'}/>
      </CardContent> :
      <React.Fragment>
        <CurrentWeather />
        <WeatherForecast />
      </React.Fragment>
      }

    </Card>
  )
};

export default WeatherWidget;
