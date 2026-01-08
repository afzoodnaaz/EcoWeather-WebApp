// src/weather.js

export function safeTrim(v) {
  return (v ?? "").toString().trim();
}

// ===== API: City -> coords =====
export async function geocodeCity(city) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}` +
    `&count=1&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding HTTP error");
  const data = await res.json();

  const results = data?.results;
  if (!results || results.length === 0) return null;
  return results[0];
}

// ===== API: coords -> current weather =====
export async function fetchWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}` +
    `&longitude=${encodeURIComponent(lon)}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather HTTP error");
  const data = await res.json();

  const current = data?.current;
  if (!current) throw new Error("Weather parse error");

  return {
    temperature: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m
  };
}
