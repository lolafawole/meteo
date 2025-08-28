function dateFormatter(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function refreshWeather(response) {
  let temperature = document.querySelector("#temp-value");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#weather-city");
  city.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = dateFormatter(date);
  let icon = document.querySelector("#temp-icon");
  icon.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="temp-icon"
              />`;
}

function citySearch(city) {
  let apiKey = "73c0at20fo892f9e52b6b3bf1ca0b4f2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  citySearch(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="weather-forcast-day">
      <div class="weather-forcast-date">${day}</div>
      <div class="weather-forcast-icon">☀️</div>
      <div class="weather-forecast-temperature">
        <div class="weather-forecast-temp">
          <strong>18°</strong>
        </div>
        <div class="weather-forecast-temp">10°</div>
      </div>
    </div>
`;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}

citySearch("London");
displayForecast();
