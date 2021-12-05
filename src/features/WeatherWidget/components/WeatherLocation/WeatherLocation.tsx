import React from 'react';
import {
  CardContent,
  Input,
  IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiCrosshairsGps,
  mdiInformationOutline
} from '@mdi/js';

import styles from './WeatherLocation.module.css';

const WeatherLocation = () => {
  return (
    <CardContent
      classes={{
        root: styles['weather-location']
      }}
    >
      <IconButton>
          <Icon path={mdiCrosshairsGps} size={1}/>
      </IconButton>
      <Input
        classes={{
          input: styles['city-input']
        }}
        disableUnderline value={'tampa'}
      />
        <IconButton>
          <Icon path={mdiInformationOutline} size={1}/>
      </IconButton>
    </CardContent>

  );
};

export default WeatherLocation;
