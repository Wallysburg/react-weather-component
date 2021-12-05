import React from 'react';
import {
  Typography,
  CardContent
} from '@material-ui/core';

import {
  useAppSelector,
  useAppDispatch
} from '../../../../app/hooks';

const CurrentWeather = () => {
  const description = useAppSelector((state) => state.weatherWidget.description);
  const temperature = useAppSelector((state) => state.weatherWidget.temperature);

  return (
    <CardContent>
        <Typography align='center' variant='h5' component='div'>
          {description}
        </Typography>
        <Typography align='center' variant='h1' component='div'>
          {temperature}°f
        </Typography>
    </CardContent>
  )
};

export default CurrentWeather;
