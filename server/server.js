import express from 'express'
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const app = express()
dotenv.config();
const port = process.env.PORT || 3001
const jsonParser = bodyParser.json()
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/api/weather', jsonParser, async (req, res) => {
  try {
    const city = req.query.city;
    const lat = req.query.lat;
    const lon = req.query.lon;

    const temperatureUnits = 'imperial';

    let forecastUrl = '';

    if (city) {
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${temperatureUnits}&appid=${WEATHER_API_KEY}`;
    } else {
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${temperatureUnits}&appid=${WEATHER_API_KEY}`;
    }

    const response = await fetch(forecastUrl);
    const json = await response.json();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(json, null, 2));

  } catch (error) {
    res.writeHead(580, 'InternalError', { 'content-type': 'application/json' });
    res.end(JSON.stringify({ errorCode: 'InternalError' }));
  }
});

app.listen(port, () => console.log('App is listening on port 3001.'))
