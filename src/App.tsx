import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';

const API_KEY = '74cd05d7dc28a9df249d7d60635a3315';
const API_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_URL}/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Ciudad no encontrada');
      }
      
      const data = await response.json();
      setWeather({
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        city: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: data.main.feels_like
      });
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2742&auto=format&fit=crop')] mix-blend-overlay opacity-20"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Clima App
            </h1>
            <p className="text-blue-200 text-xl">Descubre el clima en tiempo real</p>
          </header>

          <SearchBar 
            city={city}
            setCity={setCity}
            handleSubmit={handleSubmit}
          />

          <div className="mt-8 backdrop-blur-lg bg-white/10 rounded-3xl p-8">
            <WeatherCard
              weather={weather}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;