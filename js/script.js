// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const stateInput = document.getElementById('state-input');
    const weatherContainer = document.getElementById('weather-container');
    const weatherModal = document.getElementById('weather-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');

    const apiKey = '7ac58449a473e1de5175cb512d47a950'; // Replace with your OpenWeatherMap API key

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        if (city && state) {
            getWeather(city, state);
        } else {
            alert('Please enter both city and state names.');
        }
    });

    async function getWeather(city, state) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=${apiKey}&units=metric`);
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