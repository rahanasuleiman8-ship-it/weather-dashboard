import React from 'react';
import { CurrentWeather as ICurrentWeather } from '../types/weather';
import { getWeatherIcon, getWeatherDescription, weatherApi } from '../services/weatherApi';

interface Props {
  data: ICurrentWeather;
  sunrise: string;
  sunset: string;
}

const CurrentWeather: React.FC<Props> = ({ data, sunrise, sunset }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/30">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">{data.name}, {data.country}</h2>
          <p className="text-white/70 capitalize mt-1">{getWeatherDescription(data.weather_code)}</p>
          <p className="text-white/50 text-sm mt-1">{data.timezone}</p>
        </div>
        <span className="text-6xl">{getWeatherIcon(data.weather_code, data.is_day)}</span>
      </div>

      <div className="flex items-end gap-4 mb-6">
        <span className="text-7xl font-thin">{data.temp}°C</span>
        <div className="text-white/70 pb-2">
          <p>Feels like {data.feels_like}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: '💧 Humidity', value: `${data.humidity}%` },
          { label: '🌬️ Wind', value: `${data.wind_speed} km/h` },
          { label: '🌅 Sunrise', value: weatherApi.formatTime(sunrise) },
          { label: '🌇 Sunset', value: weatherApi.formatTime(sunset) },
        ].map((item) => (
          <div key={item.label} className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/60 text-xs mb-1">{item.label}</p>
            <p className="font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;