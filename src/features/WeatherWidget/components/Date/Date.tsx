import React from 'react';
import {
  CardContent,
  Typography
} from '@material-ui/core';

const Date = () => {
  return (
    <CardContent>
      <Typography align='center' variant='subtitle1' component='div'>
        Sunday, December 5, 2021
      </Typography>
      <Typography align='center' variant='subtitle2' component='div'>
        12:00pm
      </Typography>
    </CardContent>
  );
};

export default Date;
