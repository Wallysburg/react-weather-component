import React from 'react';
import {
  Typography,
  CardContent
} from '@material-ui/core';

import {
  useAppSelector
} from '../../../../app/hooks';
import { TemperatureUnits } from '../../WeatherWidget.slice';

const CurrentWeather = () => {
  const description = useAppSelector((state) => state.weatherWidget.description);
  const temperature = useAppSelector((state) => state.weatherWidget.temperature);
  const temperatureUnits = useAppSelector(state => state.weatherWidget.temperatureUnits);

  const tempSymbol = temperatureUnits === TemperatureUnits.CELCIUS ? 'c' : 'f';
  const temp = temperatureUnits === TemperatureUnits.CELCIUS ? Math.round((temperature - 32) * 5/9) : temperature;

  return (
    <CardContent>
        <Typography align='center' variant='h5' component='div'>
          {description}
        </Typography>
        <Typography align='center' variant='h1' component='div'>
          {temp}°{tempSymbol}
        </Typography>
    </CardContent>
  )
};

export default CurrentWeather;
