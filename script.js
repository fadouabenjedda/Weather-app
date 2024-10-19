const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
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
    }
}
else{
    displayError("Please enter a city");
}
});

async function getweatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch (apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("cloud not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, main: {temp, humidity}, weather: [{description, id}]}=data;
    container.textContent="";
    container.style.display="flex";
}
const cityDisplay = document.createElement("h3");
const tempDisplay = document.createElement("p");
const humidityDisplay = document.createElement("p");

container.appendChild(cityDisplay);
cityDisplay.textContent="city";

container.appendChild(tempDisplay);
tempDisplay.textContent="temp";

container.appendChild(humidityDisplay);
humidityDisplay.textContent="humidity";

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.appendChild();
    


}

console.log(getweatherData(Tanger));
getweatherData("Tanger").then(data => console.log(data)).catch(error => console.error(error));