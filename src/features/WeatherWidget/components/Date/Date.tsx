import React from 'react';
import {
  CardContent,
  Typography
} from '@material-ui/core';

import {
  useAppSelector
} from '../../../../app/hooks';

const Date = () => {
  const date = useAppSelector((state) => state.weatherWidget.date);
  const time = useAppSelector((state) => state.weatherWidget.time);

  return (
    <CardContent>
      <Typography align='center' variant='subtitle1' component='div'>
        {date}
      </Typography>
      <Typography align='center' variant='subtitle2' component='div'>
        {time}
      </Typography>
    </CardContent>
  );
};

export default Date;
