const weather = (function () {
  const API_KEY = "38bbdd7fc52fb9d3a3a41e81500f0592";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const input = document.getElementById("search");

  input.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      search();
    }
  })

  function kToF(degrees) {
    return Math.floor((degrees - 273.15) * 9/5 + 32);
  }

  function getTime(offset) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (offset*1000));
  }

  function update(data) {
    const location = document.getElementById("location");
    const description = document.getElementById("description");
    const temp = document.getElementById("temp");
    if (data.weather) {
      const weather = data.weather[0].main;
      const desc = data.weather[0].description;
      const time = getTime(data.timezone).getHours();
    
      location.textContent = data.name;
      description.textContent = desc[0].toUpperCase() + desc.slice(1);
      temp.textContent = kToF(data.main.temp) +"\xB0";
  
      setIcon(weather, time);
    } else {
      location.textContent = "Not Found";
      description.textContent = "";
      temp.textContent = ""
    }
  }

  function setIcon(weather, time) {
    if (weather === "Clear") {
      (time > 6 && time < 19) ? setWeather("clear", "sun") : setWeather("night", "moon");
    } else if (weather === "Clouds" || weather === "Mist" || weather === "Haze") {
      (time > 6 && time < 19) ? setWeather("cloudy-light", "cloud") : setWeather("cloudy-dark", "cloud");
    } else if (weather === "Rain" || weather === "Drizzle") {
      (time > 6 && time < 19) ? setWeather("cloudy-light", "cloud", "rain") : setWeather("cloudy-dark", "cloud", "rain");
    } else if (weather === "Thunderstorm" || weather === "Squall") {
      setWeather("cloudy-dark", "cloud", "rain");
    } else if (weather === "Snow") {
      (time > 6 && time < 19) ? setWeather("cloudy-light", "cloud", "snow") : setWeather("cloudy-dark", "cloud", "snow");
    } else if (weather === "Dust" || weather === "Sand") {
      setWeather("sandy", "cloud");
    } else if (weather === "Ash" || weather === "Tornado") {
      setWeather("cloudy-dark", "cloud")
    }
  }

  function setWeather(type, icon, more = "") {
    const background = document.querySelector(".background");
    background.className = "background center " + type;

    const iconWrapper = document.querySelector(".icon-wrapper");
    const weather = document.createElement("div");
    weather.className = icon;
    if (iconWrapper.firstChild) {
      iconWrapper.removeChild(iconWrapper.firstChild);
    }
    iconWrapper.appendChild(weather);

    if (more) {
      const cloud = document.querySelector(".cloud");
      const drops = document.createElement("div");
      drops.className = more;
      addDrops(drops);
      cloud.appendChild(drops);
    }
  }

  function addDrops(parent) {
    for (let i=1; i<16; i++) {
      const drop = document.createElement("div");
      drop.className = `drop d${i}`;
      parent.appendChild(drop);
    }
  }

  async function search() {
    if (input.value) {
      const search = `${url}${input.value}&appid=${API_KEY}`;
      try {
        let response = await fetch(search, {mode: 'cors'});
        let data = await response.json();
        console.log(data);
        update(data);
      } catch (err) {
        console.log(err);
      }
      
    }
  }

  return {
    search,
  }
})();
