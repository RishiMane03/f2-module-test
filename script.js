const fetchbtn = document.getElementById("fetchBtn");

if ("geolocation" in navigator) {
  // Geolocation is available
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  // Geolocation is not available
  console.log("Geolocation is not supported by your browser.");
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  //   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  dimentions(latitude, longitude);
}

function errorCallback(error) {
  alert("Give Permission of location");
}

// 2nd page:

// Location

function dimentions(latitude, longitude) {
  const LatnLong = document.getElementById("LatnLong");

  const lati = document.createElement("button");
  lati.className = "lati";
  lati.innerHTML = `<button class="lati">Latitude: ${latitude}</button>`;

  const long = document.createElement("button");
  long.className = "long";
  long.innerHTML = `<button class="long">Longitude: ${longitude}</button>`;

  LatnLong.appendChild(lati);
  LatnLong.appendChild(long);

  mapLocation(latitude, longitude);
}

//Map

function mapLocation(latitude, longitude) {
  const lati = latitude;
  const long = longitude;
  console.log(latitude,longitude);
  const maptag = document.getElementById("map");

  const iframe = document.createElement("iframe");

  const url = `https://maps.google.com/maps?q=${lati},${long}&z=15&output=embed`;
  iframe.src = url;
  iframe.className = "map";

  maptag.appendChild(iframe);
  getWeather(lati, long);
}

// Weather:

function ThetimeZone() {
  let d = new Date();
  let t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  return t;
  // console.log(t);
}

function WindD(w) {
  if (w > 0 && w < 90) return "North East";
  if (w > 90 && w < 180) return "South East";
  if (w > 180 && w < 270) return "South West";
  if (w > 270 && w < 360) return "North West";
}

function p(pressure) {
  return pressure / 100;
}

const apiKey = "7398182f4f93ed8245846557586a43e0";

function getWeather(latitude, longitude) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the weather data here
      console.log(data);
      const cityName = data.name;
      const temperature = data.main.feels_like;
      // const weatherDescription = data.weather[0].description;
      const wind = data.wind.speed;
      const humidity = data.main.humidity;
      const time = data.timezone;
      const pressure = data.main.pressure;
      const windDeg = data.wind.deg;
      // const UV  =

      // console.log(`Weather in ${cityName}: ${temperature}°C, ${weatherDescription}`);

      const btn = document.getElementById("btns");

      const button1 = document.createElement("button");
      button1.className = "btnsss";
      button1.innerHTML = `Location: ${cityName}`;

      btn.appendChild(button1);

      const button2 = document.createElement("button");
      button2.className = "btnsss";
      button2.innerHTML = `Wind Speed: ${wind}`;

      btn.appendChild(button2);

      const button3 = document.createElement("button");
      button3.className = "btnsss";
      button3.innerHTML = `Humidity: ${humidity}`;

      btn.appendChild(button3);

      const button4 = document.createElement("button");
      button4.className = "btnsss";
      button4.innerHTML = `Time Zone: ${ThetimeZone()} GMT+0530`;

      btn.appendChild(button4);

      const button5 = document.createElement("button");
      button5.className = "btnsss";
      button5.innerHTML = `Pressure: ${p(pressure)} atm `;

      btn.appendChild(button5);

      const button6 = document.createElement("button");
      button6.className = "btnsss";
      button6.innerHTML = `Wind Direction: ${WindD(windDeg)}`;

      btn.appendChild(button6);

      const button7 = document.createElement("button");
      button7.className = "btnsss";
      button7.innerHTML = `UV INDEX: 500`;

      btn.appendChild(button7);

      const button8 = document.createElement("button");
      button8.className = "btnsss";
      button8.innerHTML = `Feels like: ${temperature} °C`;

      btn.appendChild(button8);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
