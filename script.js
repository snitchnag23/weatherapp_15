const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const message = document.getElementById("message");
const result = document.getElementById("result");

const UNAVAILABLE_MESSAGE =
  "The weather service is unavailable right now. Please try again later.";

let latestSearch = 0;

function showMessage(text) {
  result.hidden = true;
  message.textContent = text;
  message.hidden = false;
}

function formatLocalTime(text) {
  // The lookup sends a time like "2026-11-15 14:30".
  const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{1,2}:\d{2})$/.exec(text);
  if (!match) return text;
  const date = new Date(Date.UTC(match[1], match[2] - 1, match[3]));
  const day = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return day + " · " + match[4].padStart(5, "0");
}

function showWeather(data) {
  document.getElementById("place").textContent = data.city + ", " + data.country;
  document.getElementById("time").textContent = formatLocalTime(data.localTime);
  const icon = document.getElementById("icon");
  icon.src = data.iconUrl;
  icon.alt = data.description;
  document.getElementById("temp").textContent = Math.round(data.temperatureC) + "°C";
  document.getElementById("desc").textContent = data.description;
  document.getElementById("feels").textContent = Math.round(data.feelsLikeC) + "°C";
  document.getElementById("humidity").textContent = data.humidity + "%";
  document.getElementById("wind").textContent =
    Math.round(data.windKph) + " km/h " + data.windDirection;
  message.hidden = true;
  result.hidden = false;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const thisSearch = ++latestSearch;
  try {
    const response = await fetch(
      "/api/weather?city=" + encodeURIComponent(input.value.trim())
    );
    const data = await response.json();
    if (thisSearch !== latestSearch) return;
    if (response.ok) {
      showWeather(data);
    } else {
      showMessage(data.error || UNAVAILABLE_MESSAGE);
    }
  } catch (error) {
    if (thisSearch !== latestSearch) return;
    showMessage(UNAVAILABLE_MESSAGE);
  }
});
