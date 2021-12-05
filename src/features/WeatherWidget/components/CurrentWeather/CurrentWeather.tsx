import React from 'react';
import {
  Typography,
  CardContent
} from '@material-ui/core';

const CurrentWeather = () => {
  return (
    <CardContent>
        <Typography align='center' variant='h5' component='div'>
          Partly Cloudy
        </Typography>
        <Typography align='center' variant='h1' component='div'>
          80°f
        </Typography>
    </CardContent>
  )
};

export default CurrentWeather;
