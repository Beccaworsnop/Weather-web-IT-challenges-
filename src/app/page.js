"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [cityInput, setCityInput] = useState("Algiers");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData(cityInput);
  }, [cityInput]);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=2003bd41e33d477f8cf100049250402&q=${city}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (city) => {
    setCityInput(city);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!cityInput.trim()) {
      alert("Please type a city name");
      return;
    }
    fetchWeatherData(cityInput);
  };

  return (
    <div className="min-h-screen bg-cover bg-center text-white relative transition-opacity duration-500">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-start flex-col p-8">
        <div className="text-center">
          <h3 className="text-3xl font-semibold">The Weather</h3>

          <div>
            <h1 className="text-6xl">{weatherData?.location?.name || "Loading..."}</h1>
            <small className="block">
              <span className="text-xl">
                {weatherData?.location?.localtime ? weatherData.location.localtime.split(" ")[1] : "00:00"}
              </span>
              <span className="text-sm">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
              </span>
            </small>
          </div>

          <div className="flex justify-center items-center mt-4">
            {weatherData && (
              <>
                <Image src={`https:${weatherData.current.condition.icon}`} alt="Weather Icon" width={50} height={50} />
                <span className="ml-4 text-xl">{weatherData.current.condition.text}</span>
              </>
            )}
          </div>

          <div className="mt-8">
            <form onSubmit={handleFormSubmit} className="relative">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full p-3 bg-white rounded-lg text-black"
                placeholder="Search location..."
              />
              <button type="submit" className="absolute top-0 right-0 p-3 bg-white text-black rounded-lg">
                🔍
              </button>
            </form>

            <ul className="mt-4 space-y-2">
              {["Algiers", "Blida", "Boumerdes", "Tizi Ouzou"].map((city) => (
                <li key={city} className="text-lg cursor-pointer hover:underline" onClick={() => handleCityClick(city)}>
                  {city}
                </li>
              ))}
            </ul>

            <ul className="mt-8 space-y-4 text-lg">
              <h4 className="text-xl font-semibold">Weather Details</h4>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : weatherData ? (
                <>
                  <li className="flex justify-between">
                    <span>Condition</span>
                    <span className="font-semibold">{weatherData.current.condition.text}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Humidity</span>
                    <span className="font-semibold">{weatherData.current.humidity}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wind</span>
                    <span className="font-semibold">{weatherData.current.wind_kph} km/h</span>
                  </li>
                </>
              ) : (
                <p>No weather data available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

