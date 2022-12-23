const searchBtn = document.querySelector("button");
const searchBar = document.querySelector(".search-bar");
const place = document.querySelector(".city");
const myTemp = document.querySelector(".temp");
const myIcon = document.querySelector(".icon");
const desc = document.querySelector(".description");
const humid = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const display = document.querySelector(".loading");
const card = document.querySelector(".card");

let weather = {
   // I think i could use a private kinda of function here to hide th api key
   apiKey: "9b991c6b7b7ad09f573df741fc68e9a2",
   fetchWeather: function (city) {
      fetch(
         `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.apiKey}`,
         { mode: "cors" }
      )
         .then((resp) => resp.json())
         .then((data) => this.displayWeather(data));
   },
   displayWeather: function (data) {
      //it will look for em in the object and destructure em to variables
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      place.innerText = name;
      myIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
      desc.innerText = description;
      myTemp.innerText = `${Math.round(temp)} °C`;
      humid.textContent = `Humidity: ${humidity} %`;
      wind.textContent = `Wind speed: ${Math.round(speed)} km/h`;
      display.classList.remove("loading");
      document.body.style.backgroundImage = `url("https://source.unsplash.com/1366x640/?${name}")`;
   },
   search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
   },
};

searchBtn.addEventListener("click", weather.search);
window.addEventListener("keyup", (e) => {
   if (e.key == "Enter") weather.search();
});

weather.fetchWeather("tokyo");
