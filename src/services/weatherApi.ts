// Weather API Service - Uses Open-Meteo (free, no API key required)
// Geocoding: https://open-meteo.com/en/docs/geocoding-api
// Weather: https://open-meteo.com/en/docs

export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  timezone: string;
  admin1?: string; // region/state
}

export interface CurrentWeather {
  name: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  weather_code: number;
  is_day: number;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  weather_code: number;
  sunrise: string;
  sunset: string;
  precipitation_probability: number;
}

export interface HourlyData {
  time: string[];
  temperature: number[];
  humidity: number[];
  weather_code: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyData;
}

// WMO Weather Code descriptions
export const getWeatherDescription = (code: number): string => {
  const descriptions: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Slight showers', 81: 'Moderate showers', 82: 'Violent showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail',
  };
  return descriptions[code] ?? 'Unknown';
};

// WMO Weather Code to emoji icon
export const getWeatherIcon = (code: number, isDay: number = 1): string => {
  if (code === 0) return isDay ? '☀️' : '🌙';
  if (code <= 2) return isDay ? '🌤️' : '🌤️';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌦️';
  if (code <= 65) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  if (code <= 86) return '🌨️';
  return '⛈️';
};

// WMO code to background gradient
export const getWeatherBg = (code: number, isDay: number = 1): string => {
  if (!isDay) return 'from-indigo-900 via-blue-900 to-slate-900';
  if (code === 0 || code === 1) return 'from-amber-400 via-orange-300 to-sky-400';
  if (code <= 3) return 'from-blue-400 via-sky-400 to-slate-400';
  if (code <= 48) return 'from-gray-500 via-slate-400 to-gray-600';
  if (code <= 67) return 'from-slate-600 via-blue-700 to-slate-800';
  if (code <= 77) return 'from-blue-200 via-slate-300 to-blue-400';
  return 'from-gray-800 via-purple-900 to-slate-900';
};

class WeatherApiService {
  private geoUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  async geocodeCity(city: string): Promise<GeoLocation> {
    const res = await fetch(`${this.geoUrl}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if (!res.ok) throw new Error('Geocoding service unavailable');
    const data = await res.json();
    if (!data.results?.length) throw new Error(`City "${city}" not found. Please check the spelling.`);
    return data.results[0];
  }

  async getWeatherByCoords(lat: number, lon: number, locationName: string, country: string, timezone: string): Promise<WeatherData> {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max',
      hourly: 'temperature_2m,relative_humidity_2m,weather_code',
      timezone: timezone || 'auto',
      forecast_days: '5',
    });

    const res = await fetch(`${this.weatherUrl}?${params}`);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    const data = await res.json();

    const current: CurrentWeather = {
      name: locationName,
      country,
      timezone: data.timezone,
      latitude: lat,
      longitude: lon,
      temp: Math.round(data.current.temperature_2m),
      feels_like: Math.round(data.current.apparent_temperature),
      humidity: data.current.relative_humidity_2m,
      pressure: Math.round(data.current.surface_pressure),
      wind_speed: Math.round(data.current.wind_speed_10m),
      weather_code: data.current.weather_code,
      is_day: data.current.is_day,
    };

    const daily: DailyForecast[] = data.daily.time.map((date: string, i: number) => ({
      date,
      temp_max: Math.round(data.daily.temperature_2m_max[i]),
      temp_min: Math.round(data.daily.temperature_2m_min[i]),
      weather_code: data.daily.weather_code[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
      precipitation_probability: data.daily.precipitation_probability_max[i] ?? 0,
    }));

    // Get next 24 hours of hourly data
    const now = new Date();
    const hourlySlice = data.hourly.time
      .map((t: string, i: number) => ({ time: t, temp: Math.round(data.hourly.temperature_2m[i]), humidity: data.hourly.relative_humidity_2m[i], code: data.hourly.weather_code[i] }))
      .filter((h: { time: string }) => new Date(h.time) >= now)
      .slice(0, 12);

    const hourly: HourlyData = {
      time: hourlySlice.map((h: { time: string }) => h.time.split('T')[1].slice(0, 5)),
      temperature: hourlySlice.map((h: { temp: number }) => h.temp),
      humidity: hourlySlice.map((h: { humidity: number }) => h.humidity),
      weather_code: hourlySlice.map((h: { code: number }) => h.code),
    };

    return { current, daily, hourly };
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    const geo = await this.geocodeCity(city);
    return this.getWeatherByCoords(geo.latitude, geo.longitude, geo.name, geo.country, geo.timezone);
  }

  async getWeatherByGeolocation(): Promise<WeatherData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            // Reverse geocode using Open-Meteo geocoding
            const { latitude, longitude } = pos.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const geo = await res.json();
            const city = geo.address?.city || geo.address?.town || geo.address?.village || 'Your Location';
            const country = geo.address?.country || '';
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            resolve(await this.getWeatherByCoords(latitude, longitude, city, country, timezone));
          } catch {
            reject(new Error('Failed to get location weather'));
          }
        },
        () => reject(new Error('Location access denied. Please search for a city instead.'))
      );
    });
  }

  formatTime(isoTime: string): string {
    return isoTime.split('T')[1]?.slice(0, 5) ?? isoTime;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
}

export const weatherApi = new WeatherApiService();