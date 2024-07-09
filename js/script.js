// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const weatherContainer = document.getElementById('weather-container');
    const weatherModal = document.getElementById('weather-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');

    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const weatherHTML = `
            <div class="box">
                <h2 class="subtitle">${name}</h2>
                <p>Temperature: ${main.temp} °C</p>
                <p>Weather: ${weather[0].description}</p>
                <button class="button is-info" onclick="openModal('${weather[0].description}')">More Info</button>
            </div>
        `;
        weatherContainer.innerHTML = weatherHTML;
    }

    function openModal(info) {
        modalContent.textContent = info;
        weatherModal.classList.add('is-active');
    }

    modalClose.addEventListener('click', () => {
        weatherModal.classList.remove('is-active');
    });
});