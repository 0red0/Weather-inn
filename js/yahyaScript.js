const searchBtn = document.querySelector("button");
const input = document.querySelector(".search-bar");
const place = document.querySelector(".city");
const myCountry = document.querySelector(".country");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const desc = document.querySelector(".description");
const humid = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const display = document.querySelector(".loading");
const card = document.querySelector(".card");
const myErr = document.querySelector(".err");

let long;
let lati;

window.addEventListener("load", () => {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
         long = position.coords.longitude;
         lati = position.coords.latitude;
         // console.log(long, lati);
         cityName(lati, long);
      });
   }
});

async function cityName(lati, long) {
   const myLocation = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lati}&lon=${long}&appid=9b991c6b7b7ad09f573df741fc68e9a2`,
      { mode: "cors" }
   )
      .then((res) => res.json())
      .then((cName) => {
         fetching(cName[0].name);
         myCountry.textContent = cName[0].country;
      });
}

async function fetching(paraCity) {
   try {
      // if (input.value == "" || input.value == null) return;
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${paraCity}&units=metric&APPID=9b991c6b7b7ad09f573df741fc68e9a2`;

      const weather = await fetch(api);
      let data = await weather.json();
      console.log(data);
      dataToDom(data);
      showDom(data);
      myErr.style.display = "none";
   } catch (err) {
      myErr.style.display = "block";
      console.log("error while fetching url or invalid entry.!", err);
   }
}

searchBtn.addEventListener("click", () => {
   fetching(input.value);
   myCountry.style.display = "none";
});
window.addEventListener("keyup", (e) => {
   if (e.key == "Enter") fetching(input.value);
   myCountry.style.display = "none";
});

function dataToDom(data) {
   place.textContent = `Weather in => ${data.name},`;
   temp.textContent = `${Math.round(data.main.temp)} °C`;
   icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
   desc.textContent = data.weather[0].description;
   humid.textContent = `Humidity: ${data.main.humidity}%`;
   wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} km/h`;
   document.body.style.backgroundImage = `url("https://source.unsplash.com/1366x640/?${data.name}")`;
}

function showDom(data) {
   card.style.backgroundColor = `#003${data.weather[0].icon}cc`;
   display.classList.remove("loading");
   input.value = "";
}
