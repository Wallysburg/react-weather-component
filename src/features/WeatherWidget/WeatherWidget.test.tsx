import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import WeatherWidget from './WeatherWidget';
import weatherWidgetReducer, { initialWeatherWidgetState } from './WeatherWidget.slice';
import cloneDeep from 'lodash/cloneDeep';
import { configureStore } from '@reduxjs/toolkit';
import moment from 'moment';

describe('Weather Widget', () => {
  describe('when intitialy loading weather data', () => {
    test('should render a loading spinner', () => {
      const store = configureStore({
        reducer: {
          weatherWidget: weatherWidgetReducer
        }
      });

      const container = render(
        <Provider store={store}>
          <WeatherWidget />
        </Provider>
      );

      expect(container.getByRole('progressbar')).toBeInTheDocument();
    });
  });

    describe('when the weather data has successfully finished initially loading', () => {
      test('should render the current date', () => {
        const weatherWidgetState = cloneDeep(initialWeatherWidgetState);
        weatherWidgetState.initialLoad = true;

        const store = configureStore({
          reducer: {
            weatherWidget: weatherWidgetReducer
          },
          preloadedState: {
            weatherWidget: weatherWidgetState
          }
        });

        const container = render(
          <Provider store={store}>
            <WeatherWidget />
          </Provider>
        );

        const currentDate = moment().format('dddd, MMM Do YYYY')
        expect(container.getByText(currentDate)).toBeInTheDocument();
      });

      test('should render the current time', () => {
        const weatherWidgetState = cloneDeep(initialWeatherWidgetState);
        weatherWidgetState.initialLoad = true;

        const store = configureStore({
          reducer: {
            weatherWidget: weatherWidgetReducer
          },
          preloadedState: {
            weatherWidget: weatherWidgetState
          }
        });

        const container = render(
          <Provider store={store}>
            <WeatherWidget />
          </Provider>
        );

        const currentTime = moment().format('LT');
        expect(container.getByText(currentTime)).toBeInTheDocument();
      });
  });
});
