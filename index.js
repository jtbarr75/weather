const weather = (function () {
  const API_KEY = "38bbdd7fc52fb9d3a3a41e81500f0592";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const input = document.getElementById("search");

  input.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      search();
    }
  })

  async function search() {
    if (input.value) {
      const search = `${url}${input.value}&appid=${API_KEY}`;
      try {
        let response = await fetch(search, {mode: 'cors'});
        let data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      
    }
  }

  return {
    search,
  }
})();
