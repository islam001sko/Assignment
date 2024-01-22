const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const resultContainer = document.getElementById('result-container');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const weatherResponse = await fetch(`/weather/data?city=${cityInput.value}`);
    const weatherData = await weatherResponse.json();
    const latitude = weatherData.coord.lat;
    const longitude = weatherData.coord.lon;
    const countryCode = weatherData.sys.country;

    const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const countryData = await countryResponse.json();
    const icon = weatherData.weather[0].icon;
    const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    resultContainer.innerHTML = '';
    const weatherInfo = document.createElement('div');
    weatherInfo.innerHTML = `<img src="${imageURL}" alt="Weather Icon">
                             <p>Temperature: ${weatherData.main.temp}°C</p>
                              <p>Description: ${weatherData.weather[0].description}</p>
                              <p>Humidity: ${weatherData.main.humidity}%</p>
                              <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
                              <p>Pressure: ${weatherData.main.pressure} mb</p>`;
    resultContainer.appendChild(weatherInfo);

    if (Array.isArray(countryData) && countryData.length > 0) {
      const countryInfo = countryData[0];
      console.log(countryInfo);

      const countryInfoDiv = document.createElement('div');
      countryInfoDiv.innerHTML = `<p>Country Name: ${countryInfo.name.common}</p>
                                  <p>Population: ${countryInfo.population}</p>
                                  <p>Region: ${countryInfo.region}</p>
                                  <p>Capital: ${countryInfo.capital[0]}</p>`;
      resultContainer.appendChild(countryInfoDiv);
    }

    mapStart(latitude, longitude);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
});

function mapStart(latitude, longitude) {  
    if (isNaN(latitude) || isNaN(longitude)) {
        return;
      }
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      zoom: 10
    });
}
