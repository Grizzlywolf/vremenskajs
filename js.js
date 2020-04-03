const KELVIN = 273.5;
const weather= { }
const iconElement = document.querySelector(".vrijemeikona");
const tempElement = document.querySelector(".temperatura p");
const descElement = document.querySelector(".opisvremena p");
const locationElement = document.querySelector(".lokacija p");
const pressureElement = document.querySelector(".tlak p")
const humidityElement = document.querySelector(".vlaga p")
const windElement = document.querySelector(".vjetar p");

weather.pressure = {
  unit: "hPa"
}
weather.wind = {
  unit: "km/h"
}
weather.temperature = {
  unit : "celsius"
}

function getlatlong(){
if (navigator.geolocation) {

    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function (position) {
          resolve([position.coords.latitude, position.coords.longitude]);
        });
      });

}
 else {
        console.log("Nije moguće dobiti geolokaciju");
    }
}


function showvrijeme(){
  iconElement.innerHTML = `<img src="images/icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
  const opis = weather.description;
  const opisVeliko = opis.charAt(0).toUpperCase() + opis.slice(1)
  descElement.innerHTML = opisVeliko;
  pressureElement.innerHTML = `${weather.pressure.value} <span> hPa</span>`;
  humidityElement.innerHTML = `${weather.humidity} <span> %</span>`;
  windElement.innerHTML = `${weather.wind.value}<span> km/h</span>`;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

getlatlong()
.then(pos => {fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ pos[0]+"&lon="+ pos[1]+"&appid=c77bbc867a85c9e38d165c65a1698bde")
.then(function(resp) { return resp.json() })
  .then(function(response) {
    let data = response;
    console.log(data);
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.pressure.value = data.main.pressure;
    weather.humidity = data.main.humidity;
    weather.wind.value = Math.floor(data.wind.speed * 3.6);
    weather.wind;

  })
  .then(function(){
    showvrijeme();
  });
})

