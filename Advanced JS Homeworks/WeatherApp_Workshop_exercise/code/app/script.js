const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherData = document.getElementById("weather-data");
const hourlyWeather = document.getElementById("hourly");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim();
  if (!cityName) return;
  getWeatherData(cityName);
});

const getWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=skopje&appid=bf7ceaa8843919d61795dd4b4b6d3145&units=metric`
    );
    const data = await response.json();
    displayWeatherData(data);
    getHourlyWeatherData(cityName);
  } catch (error) {
    console.error(error);
    alert("Error fetching weather data. Please try again.");
  }
};

const displayWeatherData = (data) => {
  const { name, main, weather, wind } = data;
  const iconUrl = `http://openweathermap.org/img/w/10d.png`;
  weatherData.innerHTML = `
    <h2 id="city-name">${name}</h2>
    <img id="weather-icon" src="${iconUrl}">
    <p id="temperature">Temperature: ${main.temp}°C</p>
    <p id="description">${weather[0].description}</p>
    `;
};