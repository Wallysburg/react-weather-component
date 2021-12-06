import React from 'react';
import {
  CardContent,
  Typography,
  ListItem,
  Tabs
} from '@material-ui/core';

import Icon from '@mdi/react';
import {
  mdiWater
} from '@mdi/js';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';

import styles from './WeatherForecast.module.css';

type ForecastItemProps = {
  temperature: number,
  temperatureUnits: string,
  precipitation: number,
  time: string,
  day: string,
  description: string,
  iconId: string
};

const ForecastItem = (props: ForecastItemProps) => {
  const {
    temperature,
    temperatureUnits,
    precipitation,
    time,
    iconId,
    day
  } = props;
  return (
    <ListItem
      className={styles['forecast-item']}
    >
      <Typography align='center' variant='subtitle2' component='div'>
        {day}
      </Typography>
      <Typography align='center' variant='subtitle1' component='div'>
        {time}
      </Typography>
        <i className={`wi wi-owm-${iconId} main-icon`} />
      <Typography align='center' variant='subtitle1' component='div'>
       {temperature}°f
      </Typography>
      <div
        className={styles['forecast-precipitation']}
      >
        <Icon path={mdiWater} size={.6}/>
        <Typography align='center' variant='subtitle2' component='span'>
          {precipitation}%
      </Typography>
      </div>
    </ListItem>
  );
}
const WeatherForecast = () => {
  const forecast = useAppSelector(state => state.weatherWidget.forecast);

  return (
    <CardContent
      classes={{
        root: styles['forecast-container']
      }}
    >
        <Tabs scrollButtons='on' variant='scrollable' value={false}>
          {forecast.map((forecastItem, index) => (
            <ForecastItem
              key={index}
              temperature={forecastItem.temperature}
              temperatureUnits={forecastItem.temperatureUnits}
              time={forecastItem.time}
              description={forecastItem.description}
              precipitation={forecastItem.precipitation}
              iconId={forecastItem.iconId}
              day={forecastItem.day}
            />
          ))}
        </Tabs>
    </CardContent>
  );
};

export default WeatherForecast;
