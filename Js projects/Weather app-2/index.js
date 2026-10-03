// WEATHER APP — Samsung One UI inspired

const apiKey = "910b031d63ad4c257b74d78c54576aac";

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const app = document.getElementById("app");
const particles = document.getElementById("particles");

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch (error) {
      console.log(error);
      displayError("Could not find that city");
    }
  }
  else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const lang = getWeatherLangCode();
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

async function getWeatherDataByCoords(lat, lon) {
  const lang = getWeatherLangCode();
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }
  return await response.json();
}

// OpenWeatherMap's language codes mostly follow ISO 639-1, with a few
// exceptions. This maps the browser's language to the code OWM expects.
function getWeatherLangCode() {
  const browserLang = (navigator.language || "en").split("-")[0].toLowerCase();

  const exceptions = {
    cs: "cz",
    ko: "kr",
    lv: "la",
    zh: "zh_cn"
  };

  return exceptions[browserLang] || browserLang;
}

function displayWeatherInfo(data) {
  const {
    name: city,
    dt,
    main: { temp, feels_like, humidity },
    weather: [{ description, id }],
    wind: { speed },
    sys: { sunrise, sunset, country }
  } = data;

  const isDay = dt >= sunrise && dt < sunset;

  applyTheme(id, isDay);

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("p");
  const tempRow = document.createElement("div");
  const tempDisplay = document.createElement("h1");
  const emojiDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const chipsRow = document.createElement("div");

  cityDisplay.textContent = country ? `${city}, ${country}` : city;
  tempDisplay.textContent = `${Math.round(temp)}°`;
  emojiDisplay.textContent = getWeatherEmoji(id, isDay);
  descDisplay.textContent = description;

  cityDisplay.classList.add("cityDisplay");
  tempRow.classList.add("tempRow");
  tempDisplay.classList.add("tempDisplay");
  emojiDisplay.classList.add("weatherEmoji");
  descDisplay.classList.add("descDisplay");
  chipsRow.classList.add("chipsRow");

  chipsRow.appendChild(makeChip("Feels like", `${Math.round(feels_like)}°`));
  chipsRow.appendChild(makeChip("Humidity", `${humidity}%`));
  chipsRow.appendChild(makeChip("Wind", `${Math.round(speed)} m/s`));

  tempRow.appendChild(tempDisplay);
  tempRow.appendChild(emojiDisplay);

  card.appendChild(cityDisplay);
  card.appendChild(tempRow);
  card.appendChild(descDisplay);
  card.appendChild(chipsRow);
}

function makeChip(label, value) {
  const chip = document.createElement("div");
  const chipLabel = document.createElement("p");
  const chipValue = document.createElement("p");

  chip.classList.add("chip");
  chipLabel.classList.add("chipLabel");
  chipValue.classList.add("chipValue");

  chipLabel.textContent = label;
  chipValue.textContent = value;

  chip.appendChild(chipLabel);
  chip.appendChild(chipValue);

  return chip;
}

function getWeatherEmoji(weatherId, isDay) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌦️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return isDay ? "☀️" : "🌙";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

// ---------- Theming + ambient background ----------

function getTheme(weatherId, isDay) {
  if (weatherId >= 200 && weatherId < 300) {
    return { start: "#232333", end: "#3f3f57", type: "rain" };
  }
  if (weatherId >= 300 && weatherId < 600) {
    return { start: "#33414c", end: "#5c7080", type: "rain" };
  }
  if (weatherId >= 600 && weatherId < 700) {
    return { start: "#7D96A8", end: "#B8CDD9", type: "snow" };
  }
  if (weatherId >= 700 && weatherId < 800) {
    return { start: "#5B6B7C", end: "#8DA0B3", type: "clouds" };
  }
  if (weatherId === 800) {
    return isDay
      ? { start: "#2C5FC4", end: "#6DA9E4", type: "sun" }
      : { start: "#0B1026", end: "#2A3B5F", type: "stars" };
  }
  if (weatherId >= 801) {
    return isDay
      ? { start: "#5B85AE", end: "#93B4CE", type: "clouds" }
      : { start: "#151A33", end: "#333C5C", type: "clouds" };
  }
  return { start: "#2C5FC4", end: "#6DA9E4", type: "sun" };
}

function applyTheme(weatherId, isDay) {
  const theme = getTheme(weatherId, isDay);
  document.documentElement.style.setProperty("--grad-start", theme.start);
  document.documentElement.style.setProperty("--grad-end", theme.end);
  renderParticles(theme.type);
}

function renderParticles(type) {
  particles.textContent = "";

  if (type === "rain") {
    for (let i = 0; i < 40; i++) {
      const drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
      drop.style.animationDelay = `${Math.random() * 2}s`;
      particles.appendChild(drop);
    }
  }
  else if (type === "snow") {
    for (let i = 0; i < 30; i++) {
      const flake = document.createElement("div");
      const size = 3 + Math.random() * 4;
      flake.classList.add("flake");
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.animationDuration = `${6 + Math.random() * 5}s`;
      flake.style.animationDelay = `${Math.random() * 5}s`;
      particles.appendChild(flake);
    }
  }
  else if (type === "clouds") {
    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement("div");
      const size = 90 + Math.random() * 140;
      cloud.classList.add("cloud");
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size * 0.5}px`;
      cloud.style.top = `${5 + Math.random() * 40}%`;
      cloud.style.animationDuration = `${25 + Math.random() * 20}s`;
      cloud.style.animationDelay = `${-Math.random() * 20}s`;
      particles.appendChild(cloud);
    }
  }
  else if (type === "sun") {
    const glow = document.createElement("div");
    glow.classList.add("sunGlow");
    particles.appendChild(glow);
  }
  else if (type === "stars") {
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 70}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      particles.appendChild(star);
    }
  }
}

function displayError(message) {
  card.textContent = "";
  card.style.display = "flex";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.appendChild(errorDisplay);
}

function displayHint(message) {
  const hint = document.querySelector(".hint");
  if (hint) hint.textContent = message;
}

async function detectLocationAndLoadWeather() {
  if (!navigator.geolocation) {
    displayHint('No location access — try "Velbert" or any city');
    return;
  }

  displayHint("Detecting your location...");

  navigator.geolocation.getCurrentPosition(
    async position => {
      try {
        const { latitude, longitude } = position.coords;
        const weatherData = await getWeatherDataByCoords(latitude, longitude);
        displayWeatherInfo(weatherData);
        displayHint("");
      }
      catch (error) {
        console.log(error);
        displayHint('Search for a city above');
      }
    },
    error => {
      console.log(error);
      displayHint('Location access denied — search for a city above');
    }
  );
}

// default ambient state before first search
renderParticles("sun");
detectLocationAndLoadWeather();
