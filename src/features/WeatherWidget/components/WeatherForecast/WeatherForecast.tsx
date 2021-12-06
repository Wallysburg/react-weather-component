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
import { useAppSelector } from '../../../../app/hooks';

import styles from './WeatherForecast.module.css';
import { TemperatureUnits } from '../../WeatherWidget.slice';

type ForecastItemProps = {
  temperature: number,
  temperatureUnit: string,
  precipitation: number,
  time: string,
  day: string,
  description: string,
  iconId: string
};

const ForecastItem = (props: ForecastItemProps) => {
  const {
    temperature,
    temperatureUnit,
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
       {temperature}°{temperatureUnit}
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
  const temperatureUnits = useAppSelector(state => state.weatherWidget.temperatureUnits);

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
              temperature={temperatureUnits === TemperatureUnits.CELCIUS ? Math.round((forecastItem.temperature - 32) * 5/9) : forecastItem.temperature}
              temperatureUnit={temperatureUnits === TemperatureUnits.CELCIUS ? 'c' : 'f'}
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
