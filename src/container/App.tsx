import React from 'react';
import styles from './App.module.css';
import WeatherWidget from '../features/WeatherWidget';
function App() {
  return (
    <div className={styles['App']}>
      <WeatherWidget />
    </div>
  );
}

export default App;
