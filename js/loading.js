let cities = [];
let citiesMap = new Map();
let countryCode = localStorage.getItem("countryCode");
console.log(countryCode);
let data, data2;
let lastCursor;

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
} else {
  document.body.classList.remove('dark');
}

if (countryCode == "all" && localStorage.getItem("citiesMapAll") !== null) window.open('game.html', '_self');
if (countryCode == "RU" && localStorage.getItem("citiesMapRU") !== null) window.open('game.html', '_self');
if (countryCode == "US" && localStorage.getItem("citiesMapUS") !== null) window.open('game.html', '_self');
if (countryCode === "all") {
  window.addEventListener('load', () => {
    document.getElementById("percentage").textContent = cities.length / 100 + "%";
    fetch(`https://data-api.oxilor.com/rest/regions?first=100&key=euv9LgXEdISxD4ZnLOnhyRDnLDcyxQ&type=city`)
      .then(response => response.json())
      .then(apiData => {
        data = apiData;
        cities = cities.concat(Array.from(new Set(data.edges)));
        lastCursor = data.edges[data.edges.length - 1].cursor;
        console.log(lastCursor);
        document.getElementById("percentage").textContent = cities.length / 100 + "%";
        nextStep();
      })
      .catch(error => console.error('Error:', error));
  });

  function nextStep() {
    fetch(`https://data-api.oxilor.com/rest/regions?first=100&after=${lastCursor}&key=euv9LgXEdISxD4ZnLOnhyRDnLDcyxQ&type=city`)
      .then(resp => resp.json())
      .then(apiData2 => {
        data2 = apiData2;
        cities = cities.concat(Array.from(new Set(data2.edges)));
        lastCursor = data2.edges[data2.edges.length - 1].cursor;
        console.log(lastCursor);
        console.log(cities.length);
        if (cities.length === 10100) {
          cities.forEach(city => {
            if (city.node && city.node.name) {
              let firstLetter = city.node.name.charAt(0);
              if (/^[А-Я]/.test(firstLetter)) {
                firstLetter = firstLetter.toUpperCase();
                if (!citiesMap.has(firstLetter)) {
                  citiesMap.set(firstLetter, []);
                }
                citiesMap.get(firstLetter).push(city.node.name);
              }
            }
          });
          localStorage.setItem("citiesMapAll", JSON.stringify([...citiesMap]));
          window.open('game.html', '_self');
        }
        else {
          document.getElementById("percentage").textContent = cities.length / 100 + "%";
          nextStep();
        }
      })
      .catch(error => console.error('Error:', error));
  }
}
else {
  window.addEventListener('load', () => {
    document.getElementById("percentage").textContent = cities.length / 100 + "%";
    fetch(`https://data-api.oxilor.com/rest/regions?first=100&countryCode=${countryCode}&key=euv9LgXEdISxD4ZnLOnhyRDnLDcyxQ&type=city`)
      .then(response => response.json())
      .then(apiData => {
        data = apiData;
        cities = cities.concat(Array.from(new Set(data.edges)));
        lastCursor = data.edges[data.edges.length - 1].cursor;
        console.log(lastCursor);
        document.getElementById("percentage").textContent = cities.length / 100 + "%";
        nextStep();
      })
      .catch(error => console.error('Error:', error));
  });

  function nextStep() {
    fetch(`https://data-api.oxilor.com/rest/regions?first=100&countryCode=${countryCode}&after=${lastCursor}&key=euv9LgXEdISxD4ZnLOnhyRDnLDcyxQ&type=city`)
      .then(resp => resp.json())
      .then(apiData2 => {
        data2 = apiData2;
        cities = cities.concat(Array.from(new Set(data2.edges)));
        lastCursor = data2.edges[data2.edges.length - 1].cursor;
        console.log(lastCursor);
        console.log(cities.length);
        if (cities.length === 10100) {
          cities.forEach(city => {
            if (city.node && city.node.name) {
              let firstLetter = city.node.name.charAt(0);
              if (/^[А-Я]/.test(firstLetter)) {
                firstLetter = firstLetter.toUpperCase();
                if (!citiesMap.has(firstLetter)) {
                  citiesMap.set(firstLetter, []);
                }
                citiesMap.get(firstLetter).push(city.node.name);
              }
            }
          });
          if (countryCode == "RU") localStorage.setItem("citiesMapRU", JSON.stringify([...citiesMap]));
          if (countryCode == "US") localStorage.setItem("citiesMapUS", JSON.stringify([...citiesMap]));
          window.open('game.html', '_self');
        }
        else {
          document.getElementById("percentage").textContent = cities.length / 100 + "%";
          nextStep();
        }
      })
      .catch(error => console.error('Error:', error));
  }
}