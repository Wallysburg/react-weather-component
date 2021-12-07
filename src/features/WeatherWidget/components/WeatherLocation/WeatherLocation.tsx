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
  mdiTemperatureCelsius,
  mdiTemperatureFahrenheit
} from '@mdi/js';

import {
  useAppSelector,
  useAppDispatch
} from '../../../../app/hooks';

import confetti from 'canvas-confetti';
import styles from './WeatherLocation.module.css';
import { TemperatureUnits, getForecast, RequestStatus, toggleTemperatureUnits } from '../../WeatherWidget.slice';

const WeatherLocation = () => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.weatherWidget.city);
  const tempUnits = useAppSelector((state) => state.weatherWidget.temperatureUnits);
  const fetchForecastRequestStatus = useAppSelector((state) => state.weatherWidget.fetchForecastRequestStatus);
  const [localCityInputState, setLocalCityInputState] = useState(city);
  const [getLocationState, setGetLocationState] = useState(RequestStatus.IDLE);
  useEffect(function updateLocalStateOnCityStateChange() {
    setLocalCityInputState(city);
  }, [city])


  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (localCityInputState === 'party') {
        confetti();
        return;
      }

      dispatch(getForecast({
        location: localCityInputState,
        temperatureUnits: 'imperial'
      }))
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setLocalCityInputState(e.target.value);

  const handleGetLocationClick = () =>{
    setGetLocationState(RequestStatus.LOADING)
    navigator.geolocation.getCurrentPosition(function(position) {
      setGetLocationState(RequestStatus.IDLE)
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
  }

  return (
    <CardContent
      classes={{
        root: styles['weather-location']
      }}
    >
      <IconButton onClick={handleGetLocationClick}>
          <Icon className={getLocationState === RequestStatus.LOADING ? styles['location-icon-spin'] : ''} path={mdiCrosshairsGps} size={1} />
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
      <IconButton onClick={() => {
        dispatch(toggleTemperatureUnits());
      }}>
          <Icon path={tempUnits === TemperatureUnits.CELCIUS ? mdiTemperatureCelsius : mdiTemperatureFahrenheit} size={1}/>
      </IconButton>
    </CardContent>

  );
};

export default WeatherLocation;
