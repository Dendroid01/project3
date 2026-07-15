import { useState, useEffect } from 'react';
import { getCurrentWeather, getFiveDayForecast } from '~/shared/services/weatherService';

const FALLBACK_LAT = 55.7558;
const FALLBACK_LON = 37.6173;

interface WeatherData {
    weather: any;
    forecast: any;
    cityName?: string;
    weatherCityName?: string;
}

const reverseGeocode = async (lat: number, lon: number): Promise<string | null> => {
    try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return data[0].name;
        }

        return null;
    } catch (err) {
        return null;
    }
};

export function useWeatherWithLocation() {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [isGeoLoading, setIsGeoLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setCoords({ lat: FALLBACK_LAT, lon: FALLBACK_LON });
            setIsGeoLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setCoords({
                    lat: latitude,
                    lon: longitude,
                });
                setIsGeoLoading(false);
            },
            () => {
                setCoords({ lat: FALLBACK_LAT, lon: FALLBACK_LON });
                setIsGeoLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 60000,
            }
        );
    }, []);

    useEffect(() => {
        if (!coords) {
            return;
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                const [weatherData, forecastData, geoCityName] = await Promise.all([
                    getCurrentWeather(coords.lat, coords.lon),
                    getFiveDayForecast(coords.lat, coords.lon),
                    reverseGeocode(coords.lat, coords.lon)
                ]);

                setData({
                    weather: weatherData,
                    forecast: forecastData,
                    cityName: geoCityName || undefined,
                    weatherCityName: weatherData?.name
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [coords]);

    const isLoading = isGeoLoading || loading;

    return { data, isLoading, error };
}