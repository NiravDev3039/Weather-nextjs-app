"use client"
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        setError(null);
      } else {
        setWeather(null);
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setWeather(null);
      setError('Failed to fetch weather data');
    }
  };

  // Determine Font Awesome icon based on weather condition
  const getWeatherIcon = () => {
    if (weather) {
      switch (weather.weather[0].main) {
        case 'Clear':
          return 'fas fa-sun'; // Sun icon
        case 'Clouds':
          return 'fas fa-cloud'; // Cloud icon
        case 'Rain':
          return 'fas fa-cloud-showers-heavy'; // Rain icon
        case 'Snow':
          return 'fas fa-snowflake'; // Snow icon
        case 'Thunderstorm':
          return 'fas fa-bolt'; // Thunderstorm icon
        default:
          return 'fas fa-cloud-sun'; // Default icon
      }
    }
    return 'fas fa-cloud-sun'; // Default icon
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black backcolor">
      <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg ">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <button
          onClick={fetchWeather}
          className="bg-purple-600 text-white py-2 px-4 rounded w-full hover:bg-purple-700 transition-colors"
        >
          Get Weather
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {weather && (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <i className={`${getWeatherIcon()} text-5xl text-blue-500`}></i>
              <p className="text-lg ml-4">{weather.weather[0]?.description || 'No description available'}</p>
            </div>
            <p className="text-xl font-semibold">Temperature: {weather.main?.temp || 'N/A'} °C</p>
            <p className="text-lg">Humidity: {weather.main?.humidity || 'N/A'}%</p>
            <p className="text-lg">Wind Speed: {weather.wind?.speed || 'N/A'} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}
