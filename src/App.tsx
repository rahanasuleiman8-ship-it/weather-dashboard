import React, { useEffect, Suspense, lazy } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import { getWeatherBg } from './services/weatherApi';

// Lazy load heavy components
const CurrentWeather = lazy(() => import('./components/CurrentWeather'));
const Forecast = lazy(() => import('./components/Forecast'));
const WeatherChart = lazy(() => import('./components/WeatherChart'));

const ComponentSkeleton: React.FC<{ height?: string }> = ({ height = 'h-48' }) => (
  <div className={`${height} bg-white/10 rounded-2xl animate-pulse border border-white/20`} />
);

const App: React.FC = () => {
  const { data, loading, error, fetchByCity, fetchByGeolocation } = useWeather();

  useEffect(() => {
    fetchByCity('London');
  }, [fetchByCity]);

  const bg = data
    ? getWeatherBg(data.current.weather_code, data.current.is_day)
    : 'from-blue-600 to-blue-900';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg} transition-all duration-1000`}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">🌤️ Weather Dashboard</h1>
          <p className="text-white/70">Real-time weather data & forecasts — no API key required</p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={fetchByCity} onGeolocate={fetchByGeolocation} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/30 border border-red-400/50 text-white rounded-xl p-4 mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-white" />
          </div>
        )}

        {/* Weather Data with lazy loading */}
        {!loading && data && (
          <div className="space-y-6">
            <Suspense fallback={<ComponentSkeleton height="h-64" />}>
              <CurrentWeather
                data={data.current}
                sunrise={data.daily[0]?.sunrise ?? ''}
                sunset={data.daily[0]?.sunset ?? ''}
              />
            </Suspense>

            <Suspense fallback={<ComponentSkeleton height="h-48" />}>
              <Forecast data={data.daily} />
            </Suspense>

            <Suspense fallback={<ComponentSkeleton height="h-64" />}>
              <WeatherChart data={data.hourly} />
            </Suspense>
          </div>
        )}

        {/* Empty state */}
        {!loading && !data && !error && (
          <div className="text-center text-white/60 py-20">
            <p className="text-6xl mb-4">🌍</p>
            <p className="text-xl">Search for a city to see weather data</p>
          </div>
        )}

        <p className="text-center text-white/40 text-xs mt-8">
          Powered by <a href="https://open-meteo.com" target="_blank" rel="noreferrer" className="underline hover:text-white/60">Open-Meteo</a> — Free & Open Source Weather API
        </p>
      </div>
    </div>
  );
};

export default App;