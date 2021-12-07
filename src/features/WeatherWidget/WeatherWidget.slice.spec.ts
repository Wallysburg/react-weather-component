import weatherWidgeReducer, {
  initialWeatherWidgetState,
  updateTime,
  completeInitialLoad,
  toggleTemperatureUnits,
  TemperatureUnits
} from './WeatherWidget.slice';

import cloneDeep from 'lodash/cloneDeep';

describe('Weather Widget Reducer', () => {
  const initialState = cloneDeep(initialWeatherWidgetState);

  it('should handle initial state', () => {
    expect(weatherWidgeReducer(undefined, { type: 'unknown'})).toEqual(initialWeatherWidgetState);
  });

  it('should handle "completeInitialLoad" action', () => {
    expect(initialState.initialLoad).toEqual(false);
    const result = weatherWidgeReducer(initialState, completeInitialLoad());
    expect(result.initialLoad).toEqual(true);
  });

  it('should handle "toggleTemperatureUnits" action', () => {
    expect(initialState.temperatureUnits).toEqual(TemperatureUnits.FARENHEIGHT);
    let result = weatherWidgeReducer(initialState, toggleTemperatureUnits());
    expect(result.temperatureUnits).toEqual(TemperatureUnits.CELCIUS);
    result = weatherWidgeReducer(initialState, toggleTemperatureUnits());
    expect(initialState.temperatureUnits).toEqual(TemperatureUnits.FARENHEIGHT);
  });
});
