// write your code here
// let selectedCity = "Oslo";
// selectedCity = prompt("What city are you searching the weather for?");

// might want to put something to prevent throwing error if city is not in object

// selectedCity = selectedCity.trim();

// let selectedCityCompare = selectedCity.toLowerCase();

/*
if (Object.keys(weather).includes(selectedCityCompare) === false) {
  alert(
    `I'm sorry, I do not have the weather for ${selectedCity}. Try searching google for it. https://www.google.com/search?q=weather+${selectedCity}`
  );
} else if (Object.keys(weather).includes(selectedCityCompare) === true) {
  let fahrenheit = Math.round(
    weather[selectedCityCompare]["temp"] * (9 / 5) + 32
  );
  alert(
    `It is currently ${Math.round(
      weather[selectedCityCompare]["temp"]
    )}°C (${fahrenheit}°F) in ${selectedCity} with a humidity of ${
      weather[selectedCityCompare]["humidity"]
    }%`
  );
}
*/

let apiKey = "de2c40e370d58e257faf07ba4ea95840";
let units = "metric";
let selectedCity = "Sundbyberg";
let temp = "";

let h1Today = document.querySelector(".today h1");
let now = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
h1Today.innerHTML = `${
  week[now.getDay()]
} <small><small>${now.toLocaleTimeString([], {
  timeStyle: "short"
})}</small></small>`;
// Time needs a fix for getting 2 digits if starting with 0.
// date.toLocaleTimeString(("sv-SE"), {timeStyle: 'short'})

let h1Location = document.querySelector(".current-location h1");

function changeCityName(response) {
  let gotCity = response.data[0].name;
  h1Location.innerHTML = `${gotCity}`;
}

function showTemperature(response) {
  let temp = response.data.main.temp;
  let tempNumber = document.querySelector(".current-weather-temperature");
  tempNumber.innerHTML = `${Math.round(temp)}°C`;
}

function setLocale(event) {
  event.preventDefault();
  selectedCity = inputLocation.value;
  selectedCity = selectedCity.trim();

  let selectedCityCompare = selectedCity.toLowerCase();
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCityCompare}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);

  h1Location.innerHTML = `${inputLocation.value}`;
}

let locationSearchForm = document.querySelector("#location-search-form");
let inputLocation = document.querySelector("#inputLocation");

locationSearchForm.addEventListener("submit", setLocale);

function apiCall(position) {
  function getTemperature(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    axios.get(apiURL).then(showTemperature);
  }

  function getCityName(position) {
    let limit = 1;
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // let apiURL2 =
    // "https://api.openweathermap.org/geo/1.0/reverse?lat=59.3820692&lon=17.9464974&limit=2&appid=de2c40e370d58e257faf07ba4ea95840";
    let apiURL2 = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${apiKey}`;

    axios
      .get(apiURL2)
      .then(changeCityName)
      .catch((error) => {
        console.log(error);
      });
  }

  getTemperature(position);
  getCityName(position);
}

function makeAPIcall() {
  navigator.geolocation.getCurrentPosition(apiCall);
}

let currentLocationButton = document.querySelector(".btn-current-location");
currentLocationButton.addEventListener("click", makeAPIcall);

// May have to remove
/* let tempToggleInternal = "celsius";

function shiftTempStyle(event) {
  event.preventDefault();
  if (tempToggleInternal === "celsius") {
    tempDisplay.innerHTML = `${fahrenheit2}°F`;
    tempToggleInternal = "fahrenheit";
  } else if (tempToggleInternal === "fahrenheit") {
    tempDisplay.innerHTML = `${temp}°C`;
    tempToggleInternal = "celsius";
  }
}



let toggleTemperatureStyle = document.querySelector(
  "#toggle-temperature-style"
);

let tempDisplay = document.querySelector(".current-weather-temperature");
let temperatureTodayC = temp; // set manually
let fahrenheit2 = Math.round(temperatureTodayC * (9 / 5) + 32);

toggleTemperatureStyle.addEventListener("click", shiftTempStyle);
*/

/*
function getWeather(selectedCity) {
  console.log(`The temperature in ${selectedCity} is `);
}
It is currently 19°C (66°F) in Paris with a humidity of 80%"
(0°C × 9/5) + 32 = 32°F
*/

/* ⏰Feature #1
In your project, display the current date and time using JavaScript: Tuesday 16:00

🕵️‍♀️Feature #2
Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

🙀Bonus Feature
Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
*/
