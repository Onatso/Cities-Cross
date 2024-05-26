let cities = JSON.parse(localStorage.getItem("citiesMap"));
let difficulty = localStorage.getItem("difficulty");
const cityNameElement = document.getElementById('city-name');
let input = document.getElementById("city-input");
let submitButton = document.getElementById("submit-button");
let scoreTable = document.getElementById("score");
let timeSpan=document.getElementById("timer");
let score = 0;
let bool;
let timeLeft;
scoreTable.textContent = score;
console.log(cities);

let size = cities.length;
let randIndex1 = Math.floor(size * Math.random());
let randIndex2 = Math.floor(Array.from(cities[randIndex1][1]).length * Math.random());
let randcity = cities[randIndex1][1][randIndex2];
cityNameElement.textContent = randcity;
cities[randIndex1][1].splice(randIndex2, 1);
console.log(cities);

submitButton.addEventListener('click', () => {
  let inputedCity = input.value;
  inputedCity = inputedCity.charAt(0).toUpperCase() + inputedCity.substr(1).toLowerCase();
  for (let i = 0; i < inputedCity.length; i++) {
    if (inputedCity.charAt(i) === ' '||inputedCity.charAt(i) === '-') inputedCity = inputedCity.substr(0, i + 1) + inputedCity.charAt(i + 1).toUpperCase() + inputedCity.substr(i + 2).toLowerCase();
  }
  if (randcity.charAt(randcity.length - 1).toUpperCase() === inputedCity.charAt(0)) {
    bool = false;
    for (let i = 0; i < cities.length; i++) {
      if (bool) break;
      if (cities[i][0] === inputedCity.charAt(0).toUpperCase()) {
        for (let j = 0; j < cities[i][1].length; j++) {
          if (bool) break;
          if (cities[i][1][j] === inputedCity) {
            score++;
            scoreTable.textContent = score;
            cities[i][1].splice(j, 1);
            if(inputedCity.charAt(inputedCity.length - 1)=='ь') inputedCity=inputedCity.substr(0, inputedCity.length-1);
            for (let k = 0; k < cities.length; k++) {
              if (cities[k][0] === inputedCity.charAt(inputedCity.length - 1).toUpperCase()) {
                randIndex1 = k;
                randIndex2 = Math.floor(Array.from(cities[randIndex1][1]).length * Math.random());
                randcity = cities[randIndex1][1][randIndex2];
                cityNameElement.textContent = randcity;
                cities[randIndex1][1].splice(randIndex2, 1);
                bool = true;
                break;
              }
            }
          }
        }
      }
    }
    if (!bool) {
      score--;
      scoreTable.textContent = score;
    }
  }
  else
  {
    score--;
    scoreTable.textContent = score;
  }
  input.value = '';
});

cityNameElement.addEventListener('click', () => {
  const cityName = cityNameElement.textContent;
  const iframeElement = document.createElement('iframe');
  const closeButton = document.createElement('button');
  iframeElement.src = `https://ru.m.wikipedia.org/wiki/${cityName}`;
  iframeElement.width = '25%';
  iframeElement.height = '100%';
  iframeElement.style.position = 'absolute';
  iframeElement.style.top = '40px';
  iframeElement.style.right = '0';
  iframeElement.allowFullscreen = true;
  closeButton.textContent = 'X';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '0';
  closeButton.style.right = '0';
  closeButton.style.backgroundColor = 'white';
  closeButton.style.color = 'red';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px 20px';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.cursor = 'pointer';
  closeButton.addEventListener('click', () => {
    iframeElement.remove();
    closeButton.remove();
  });
  document.body.appendChild(closeButton);
  document.body.appendChild(iframeElement);
});

cityNameElement.addEventListener('mouseover', () => {
  cityNameElement.style.cursor = "pointer";
});




