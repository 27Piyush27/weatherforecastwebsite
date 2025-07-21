import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Cloud, Sun, CloudRain, CloudSnow, Eye, Droplets, Wind, Thermometer, MapPin, Search, TrendingUp } from 'lucide-react';

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('London');
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  // Mock weather data generator
  const generateMockWeather = (cityName) => {
    const temps = [15, 18, 22, 19, 16, 14, 20];
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy'];
    const baseTemp = Math.random() * 20 + 10;
    
    return {
      current: {
        city: cityName,
        temperature: Math.round(baseTemp + Math.random() * 10),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.round(Math.random() * 40 + 40),
        windSpeed: Math.round(Math.random() * 15 + 5),
        visibility: Math.round(Math.random() * 5 + 8),
        pressure: Math.round(Math.random() * 50 + 1000),
        feelsLike: Math.round(baseTemp + Math.random() * 5),
      },
      forecast: temps.map((temp, index) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
        temperature: Math.round(baseTemp + temp + Math.random() * 8 - 4),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.round(Math.random() * 30 + 50),
        windSpeed: Math.round(Math.random() * 10 + 8),
        precipitation: Math.round(Math.random() * 60),
      }))
    };
  };

  // Simulate API call
  const fetchWeather = async (cityName) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = generateMockWeather(cityName);
    setCurrentWeather(data.current);
    setForecast(data.forecast);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity.trim());
      setSearchCity('');
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const temperatureData = forecast.map(day => ({
    day: day.day,
    temperature: day.temperature,
    humidity: day.humidity
  }));

  const precipitationData = forecast.map(day => ({
    day: day.day,
    precipitation: day.precipitation
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Cloud className="w-10 h-10" />
            Weather Forecast
          </h1>
          
          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 pl-12 pr-20 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'current' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Current Weather
            </button>
            <button
              onClick={() => setActiveTab('forecast')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'forecast' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              7-Day Forecast
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'trends' 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Trends & Analytics
            </button>
          </div>
        </div>

        {/* Current Weather Tab */}
        {activeTab === 'current' && currentWeather && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Weather Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6" />
                <h2 className="text-2xl font-semibold">{currentWeather.city}</h2>
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-6xl font-bold mb-2">{currentWeather.temperature}°C</div>
                  <div className="text-xl opacity-80">Feels like {currentWeather.feelsLike}°C</div>
                </div>
                <div className="text-center">
                  {getWeatherIcon(currentWeather.condition)}
                  <div className="mt-2 capitalize">{currentWeather.condition.replace('-', ' ')}</div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Weather Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-300" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-semibold">{currentWeather.humidity}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5 text-green-300" />
                    <span>Wind Speed</span>
                  </div>
                  <span className="font-semibold">{currentWeather.windSpeed} km/h</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-300" />
                    <span>Visibility</span>
                  </div>
                  <span className="font-semibold">{currentWeather.visibility} km</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-5 h-5 text-red-300" />
                    <span>Pressure</span>
                  </div>
                  <span className="font-semibold">{currentWeather.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7-Day Forecast Tab */}
        {activeTab === 'forecast' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-6">7-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="bg-white/10 rounded-2xl p-4 text-white text-center hover:bg-white/20 transition-all">
                  <div className="font-semibold mb-2">{day.day}</div>
                  <div className="text-sm opacity-70 mb-3">{day.date.split('/').slice(0, 2).join('/')}</div>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="text-2xl font-bold mb-2">{day.temperature}°C</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Humidity:</span>
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span>{day.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trends & Analytics Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="flex items-center gap-3 text-white mb-6">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-2xl font-semibold">Temperature & Humidity Trends</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#fbbf24" 
                      strokeWidth={3}
                      dot={{ fill: '#fbbf24', strokeWidth: 2, r: 6 }}
                      name="Temperature (°C)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="humidity" 
                      stroke="#60a5fa" 
                      strokeWidth={3}
                      dot={{ fill: '#60a5fa', strokeWidth: 2, r: 6 }}
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Precipitation Forecast</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={precipitationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Bar 
                      dataKey="precipitation" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      name="Precipitation (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-white/70">
          <p>Weather data simulated for demonstration • Built with React & Chart.js</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;