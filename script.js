const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector("#cityInput");
const weatherdisplay = document.querySelector(".weatherdisplay");
const apiKey = "7de206b5813f862c8e2edd9ca18ec51b";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;

if(city){
    try{
        const weatherData = await getweatherData(city);
        displayWeatherInfo(weatherData);
    }
    catch(error){
        console.error(error);
        displayError("Failed to fetch weather data.");
    }
}
else{
    displayError("Please enter a city");
}
});

async function getweatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch (apiUrl);
    if(!response.ok){
        throw new Error("cloud not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, main: {temp, humidity}} = data;

    container.innerHTML = "";
    const cityDisplay = document.createElement("h3");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");

    cityDisplay.textContent = `City:${city}`;
    tempDisplay.textContent = `Temperature:${(temp-273.15).toFixed(2)}°C`;
    humidityDisplay.textContent = `Humidity:${humidity}%`;

    container.appendChild(cityDisplay);
    container.appendChild(tempDisplay);
    container.appendChild(humidityDisplay);
}

function displayError(message){
container.innerHTML = "";
const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
container.appendChild(errorDisplay);
}

// console.log(getweatherData(Tanger));
// getweatherData("Tanger").then(data => console.log(data)).catch(error => console.error(error));