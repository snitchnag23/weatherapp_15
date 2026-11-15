# Weather App

## What the app is

* A simple weather website.
* You type a city name and see the current weather for that city.

## How it works

* Type a city name in the box.
* Click **Search** (or press **Enter**).
* The page shows the weather for that city:
  * City and country
  * Local time there
  * A small weather picture and a short description, like "Partly cloudy"
  * The temperature in Celsius
  * What it feels like, in Celsius
  * Humidity
  * Wind speed (in km/h) and wind direction

## Where the weather comes from

* All weather data comes from [weatherapi.com](https://www.weatherapi.com).
* The page does not talk to weatherapi.com directly. It asks a small helper on the server, and the helper asks weatherapi.com.

## Where it is hosted

* The code lives on GitHub.
* The website is published on [Vercel](https://vercel.com).
* weatherapi.com needs a secret password, called an API key.
* The key is stored on Vercel, in a setting called an environment variable, named `WEATHER_API_KEY`.
* The key is never written in the code and is never sent to your browser.

## What happens when something goes wrong

The page shows a short, friendly message:

* If the city is empty or can't be found:
  * "We couldn't find that city. Please check the spelling and try again."
* If the weather can't be loaded for any other reason (for example, the key is missing, wrong or over its limit):
  * "The weather service is unavailable right now. Please try again later."

## Live link

[add live link here]

## Credits

* Weather data from [weatherapi.com](https://www.weatherapi.com).
