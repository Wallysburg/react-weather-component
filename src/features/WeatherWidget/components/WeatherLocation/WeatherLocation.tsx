import React, {
  useState,
  useEffect
} from 'react';
import {
  CardContent,
  TextField,
  IconButton
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiCrosshairsGps,
  mdiInformationOutline
} from '@mdi/js';

import {
  useAppSelector,
  useAppDispatch
} from '../../../../app/hooks';

import styles from './WeatherLocation.module.css';
import { getForecast, RequestStatus } from '../../WeatherWidget.slice';

const WeatherLocation = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.weatherWidget.city);
  const fetchForecastRequestStatus = useAppSelector((state) => state.weatherWidget.fetchForecastRequestStatus);
  const [localCityInputState, setLocalCityInputState] = useState(city);

  useEffect(function updateLocalStateOnCityStateChange() {
    setLocalCityInputState(city);
  }, [city])


  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      dispatch(getForecast({
        location: localCityInputState,
        temperatureUnits: 'imperial'
      }))
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setLocalCityInputState(e.target.value);

  return (
    <CardContent
      classes={{
        root: styles['weather-location']
      }}
    >
      <IconButton onClick={() =>{
                navigator.geolocation.getCurrentPosition(function(position) {
                  let lat = position.coords.latitude;
                  let lon = position.coords.longitude;

                  dispatch(getForecast({
                    location: {
                      lat: lat,
                      lon: lon
                    },
                    temperatureUnits: 'imperial'
                  }))
                });
        }}>
          <Icon path={mdiCrosshairsGps} size={1} />
      </IconButton>
      <TextField
        classes={{
          root: styles['city-field']
        }}
        error={fetchForecastRequestStatus === RequestStatus.FAILED}
        InputProps={{
          classes: {
            input: styles['city-input']
          },
        }}
        FormHelperTextProps={{
          classes: {
            root: styles['city-input-error']
          }
        }}
        helperText={fetchForecastRequestStatus === RequestStatus.FAILED ? 'Unable to find city' : ''}
        onChange={handleOnChange}
        onKeyPress={(handleKeyPress)}
        value={localCityInputState}
      />
        <IconButton>
          <Icon path={mdiInformationOutline} size={1}/>
      </IconButton>
    </CardContent>

  );
};

export default WeatherLocation;
