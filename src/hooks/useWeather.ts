import { useState, useCallback } from 'react';
import { WeatherData } from '../types/weather';
import { weatherApi } from '../services/weatherApi';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export const useWeather = () => {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchByCity = useCallback(async (city: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await weatherApi.getWeatherByCity(city);
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch weather',
      }));
    }
  }, []);

  const fetchByGeolocation = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await weatherApi.getWeatherByGeolocation();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to get location',
      }));
    }
  }, []);

  return { ...state, fetchByCity, fetchByGeolocation };
};