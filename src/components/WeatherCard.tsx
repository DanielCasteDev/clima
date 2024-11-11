import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  weather: {
    main: string;
    description: string;
    temp: number;
    city: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-400 text-xl font-medium">{error}</div>
        <p className="text-blue-200 mt-2">Intenta con otra ciudad</p>
      </div>
    );
  }
  
  if (!weather) return null;

  const getWeatherIcon = () => {
    switch (weather.main.toLowerCase()) {
      case 'clear':
        return <Sun size={84} className="text-yellow-400" />;
      case 'rain':
        return <CloudRain size={84} className="text-blue-400" />;
      case 'snow':
        return <CloudSnow size={84} className="text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning size={84} className="text-purple-400" />;
      default:
        return <Cloud size={84} className="text-gray-400" />;
    }
  };

  return (
    <div className="text-white">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {weather.city}
          </h2>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8">{getWeatherIcon()}</div>
          </div>
          <p className="text-7xl font-bold text-white">
            {Math.round(weather.temp)}°
          </p>
          <p className="text-2xl text-blue-200 capitalize">{weather.description}</p>
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <WeatherDetail
              icon={<Thermometer className="h-6 w-6 text-orange-400" />}
              label="Sensación térmica"
              value={`${Math.round(weather.feelsLike)}°C`}
            />
            <WeatherDetail
              icon={<Droplets className="h-6 w-6 text-blue-400" />}
              label="Humedad"
              value={`${weather.humidity}%`}
            />
            <WeatherDetail
              icon={<Wind className="h-6 w-6 text-purple-400" />}
              label="Velocidad del viento"
              value={`${Math.round(weather.windSpeed * 3.6)} km/h`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherDetail: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-2xl p-4 hover:bg-white/10 transition-colors duration-300">
    {icon}
    <div>
      <p className="text-sm text-blue-200">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  </div>
);

export default WeatherCard;