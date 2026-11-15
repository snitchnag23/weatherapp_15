const NOT_FOUND_MESSAGE =
  "We couldn't find that city. Please check the spelling and try again.";
const UNAVAILABLE_MESSAGE =
  "The weather service is unavailable right now. Please try again later.";

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  let city = req.query && req.query.city;
  if (Array.isArray(city)) city = city[0];
  city = typeof city === "string" ? city.trim() : "";

  if (!city) {
    return res.status(404).json({ error: NOT_FOUND_MESSAGE });
  }

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: UNAVAILABLE_MESSAGE });
  }

  try {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=" +
      encodeURIComponent(apiKey) +
      "&q=" +
      encodeURIComponent(city);

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const code = data && data.error && data.error.code;
      // 1006 = no matching location, 1003 = no city given
      if (code === 1006 || code === 1003) {
        return res.status(404).json({ error: NOT_FOUND_MESSAGE });
      }
      return res.status(500).json({ error: UNAVAILABLE_MESSAGE });
    }

    let icon = data.current.condition.icon;
    if (typeof icon === "string" && icon.startsWith("//")) {
      icon = "https:" + icon;
    }

    return res.status(200).json({
      city: data.location.name,
      country: data.location.country,
      localTime: data.location.localtime,
      description: data.current.condition.text,
      iconUrl: icon,
      temperatureC: data.current.temp_c,
      feelsLikeC: data.current.feelslike_c,
      humidity: data.current.humidity,
      windKph: data.current.wind_kph,
      windDirection: data.current.wind_dir,
    });
  } catch (error) {
    return res.status(500).json({ error: UNAVAILABLE_MESSAGE });
  }
};
