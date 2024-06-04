let countryCode = localStorage.getItem("countryCode");
let cities;
if (countryCode == "all") cities = JSON.parse(localStorage.getItem("citiesMapAll"));
if (countryCode == "RU") cities = JSON.parse(localStorage.getItem("citiesMapRU"));
if (countryCode == "US") cities = JSON.parse(localStorage.getItem("citiesMapUS"));
let difficulty = localStorage.getItem("difficulty");
const cityNameElement = document.getElementById('city-name');
let input = document.getElementById("city-input");
let submitButton = document.getElementById("submit-button");
let scoreTable = document.getElementById("score");
let timeSpan = document.getElementById("timer");
let score = 0;
let bool;
let timeLeft;
let timer;
let p;
scoreTable.textContent = "Счёт: " + score;
console.log(cities);

let size = cities.length;
let randIndex1 = Math.floor(size * Math.random());
let randIndex2 = Math.floor(Array.from(cities[randIndex1][1]).length * Math.random());
let randcity = cities[randIndex1][1][randIndex2];
cityNameElement.textContent = randcity;
cities[randIndex1][1].splice(randIndex2, 1);

let q;

for (let k = 0; k < cities.length; k++) {
  if (cities[k][0] === 'Й') p = k;
  if (cities[k][0] === 'Ы') q = k;
}


if (randcity.charAt(randcity.length - 1) == 'ь') randcity = randcity.substr(0, randcity.length - 1);
console.log(cities);

startTimer();

function startTimer() {
  if (difficulty == "no-limit") return;
  if (difficulty == "easy") timeLeft = 60 * 5;
  if (difficulty == "normal") timeLeft = 60;
  if (difficulty == "hard") timeLeft = 15;
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeSpan.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  timer = setInterval(() => {
    timeLeft--;
    minutes = Math.floor(timeLeft / 60);
    seconds = timeLeft % 60;
    timeSpan.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if (timeLeft == 0) {
      clearInterval(timer);
      cityNameElement.textContent = "Время вышло!";
      cityNameElement.style.color = "red";
      submitButton.style.backgroundColor = "#3e8e41";
      submitButton.disabled = true;
      return;
    }
  }, 1000);
}
submitButton.addEventListener('click', () => {
  let inputedCity = input.value;
  inputedCity = inputedCity.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]"/g, "");
  inputedCity = inputedCity.charAt(0).toUpperCase() + inputedCity.substr(1).toLowerCase();
  for (let i = 0; i < inputedCity.length; i++) {
    if (inputedCity.charAt(i) === ' ' || inputedCity.charAt(i) === '-') inputedCity = inputedCity.substr(0, i + 1) + inputedCity.charAt(i + 1).toUpperCase() + inputedCity.substr(i + 2).toLowerCase();
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
            clearInterval(timer);
            startTimer();
            scoreTable.textContent = "Счёт: " + score;
            cities[i][1].splice(j, 1);
            if (inputedCity.charAt(inputedCity.length - 1) == 'ь') inputedCity = inputedCity.substr(0, inputedCity.length - 1);
            else if (inputedCity.charAt(inputedCity.length - 1) == 'й' && Array.from(cities[p][1]).length === 0) inputedCity = inputedCity.substr(0, inputedCity.length - 1);
            else if (inputedCity.charAt(inputedCity.length - 1) == 'ы' && Array.from(cities[q][1]).length === 0) inputedCity = inputedCity.substr(0, inputedCity.length - 1);
            for (let k = 0; k < cities.length; k++) {
              if (cities[k][0] === inputedCity.charAt(inputedCity.length - 1).toUpperCase()) {
                randIndex1 = k;
                randIndex2 = Math.floor(Array.from(cities[randIndex1][1]).length * Math.random());
                randcity = cities[randIndex1][1][randIndex2];
                cityNameElement.textContent = randcity;
                if (randcity.charAt(randcity.length - 1) == 'ь') randcity = randcity.substr(0, randcity.length - 1);
                else if (randcity.charAt(randcity.length - 1) == 'й' && Array.from(cities[p][1]).length === 0) randcity = randcity.substr(0, randcity.length - 1);
                else if (randcity.charAt(randcity.length - 1) == 'ы' && Array.from(cities[p][1]).length === 0) randcity = randcity.substr(0, randcity.length - 1);
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
      scoreTable.textContent = "Счёт: " + score;
    }
  }
  else {
    score--;
    scoreTable.textContent ="Счёт: " + score;
  }
  input.value = '';
});

cityNameElement.addEventListener('click', () => {
  const cityName = cityNameElement.textContent;
  if (cityName == "Время вышло!") return;
  const iframeElement = document.createElement('iframe');
  const closeButton = document.createElement('button');
  closeButton.className = "closebtn";
  iframeElement.src = `https://ru.m.wikipedia.org/wiki/${cityName}`;
  iframeElement.allowFullscreen = true;
  closeButton.textContent = 'X';
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

input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 && input.value !== '') {
    submitButton.click();
  }
});

document.getElementById("end-button").addEventListener('click', () => {
  if (difficulty=="easy"&&localStorage.getItem("recordE") === null) localStorage.setItem("recordE", score);
  else if (difficulty=="normal"&&localStorage.getItem("recordN") === null) localStorage.setItem("recordN", score);
  else if (difficulty=="hard"&&localStorage.getItem("recordH") === null) localStorage.setItem("recordH", score);
  else if (difficulty=="easy"&&parseInt(localStorage.getItem("recordE")) < score) localStorage.setItem("recordE", score);
  else if (difficulty=="normal"&&parseInt(localStorage.getItem("recordN")) < score) localStorage.setItem("recordN", score);
  else if (difficulty=="hard"&&parseInt(localStorage.getItem("recordH")) < score) localStorage.setItem("recordH", score);
  window.open('index.html', '_self'); 
});

