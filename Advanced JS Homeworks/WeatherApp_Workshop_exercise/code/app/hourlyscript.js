const apiKey = 'bf7ceaa8843919d61795dd4b4b6d3145';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=skopje&appid=' + apiKey;

async function getWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function updateWeatherTable() {
    const weatherData = await getWeatherData();
    const tableBody = document.getElementById('weatherData');

    tableBody.innerHTML = '';

    weatherData.list.forEach(hour => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const temperature = hour.main.temp;
        const condition = hour.weather[0].description;
        const windSpeed = hour.wind.speed;

        const row = `<tr>
                        <td>${time}</td>
                        <td>${temperature}</td>
                        <td>${condition}</td>
                        <td>${windSpeed}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

updateWeatherTable();
