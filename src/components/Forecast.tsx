import React from 'react';
import { DailyForecast } from '../types/weather';
import { getWeatherIcon, getWeatherDescription, weatherApi } from '../services/weatherApi';

interface Props {
  data: DailyForecast[];
}

const Forecast: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/30">
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-3">
        {data.map((day, i) => (
          <div key={day.date} className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/60 text-xs mb-2">
              {i === 0 ? 'Today' : weatherApi.formatDate(day.date)}
            </p>
            <span className="text-3xl">{getWeatherIcon(day.weather_code)}</span>
            <p className="font-bold text-lg mt-2">{day.temp_max}°</p>
            <p className="text-white/60 text-xs">{day.temp_min}°</p>
            <p className="text-white/50 text-xs capitalize mt-1">{getWeatherDescription(day.weather_code)}</p>
            {day.precipitation_probability > 0 && (
              <p className="text-blue-300 text-xs mt-1">💧 {day.precipitation_probability}%</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;