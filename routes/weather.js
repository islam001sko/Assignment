const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENWEATHER_API_KEY = 'c31621e8271961f1c5b100dcb3ae1565';

router.get('/data', async (req, res) => {
  try {
    const city = req.query.city;
    const weatherData = await getWeatherData(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getWeatherData(city) {
  const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`);
  return response.data;
}

module.exports = router;