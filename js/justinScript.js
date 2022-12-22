const searchBtn = document.querySelector("button");
const city = document.querySelector(".search-bar");
const place = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const desc = document.querySelector(".description");
const humid = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const display = document.querySelector(".loading");
const card = document.querySelector(".card");

async function fetching() {
   try {
      if (city.value == "" || city.value == null) return;
      const weather = await fetch(
         `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=9b991c6b7b7ad09f573df741fc68e9a2`
      );
      let data = await weather.json();
      console.log(data);
      dataToDom(data);
      showDom(data);
   } catch (err) {
      console.log("error while fetching url or invalid entry.!", err);
   }
}

searchBtn.addEventListener("click", fetching);
window.addEventListener("keyup", (e) => {
   if (e.key == "Enter") fetching();
});

function dataToDom(data) {
   place.textContent = `Weather in => ${data.name}`;
   temp.textContent = `${Math.round(data.main.temp)} °C`;
   icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
   desc.textContent = data.weather[0].description.replace(
      /(\w{3})/g,
      (letter) => letter.toLowerCase()
   );
   humid.textContent = `Humidity: ${data.main.humidity}%`;
   wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} km/h`;
}

function showDom(data) {
   card.style.backgroundColor = `#003${data.weather[0].icon}cc`;
   display.classList.remove("loading");
   city.value = "";
}
