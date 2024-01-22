const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(weatherForm);
    const location = formData.get('location');
    const response = await fetch(`/weather?location=${encodeURIComponent(location)}`);
    const data = await response.json();
    displayWeatherData(data);
});

function displayWeatherData(data) {
    weatherInfo.innerHTML = `
    <h2>${data.location}</h2>
    <p>Temperature: ${data.temperature} °C</p>
    <p>Description: ${data.description}</p>
    <img src="http://openweathermap.org/img/w/${data.icon}.png" alt="${data.description}" />
    `;
}