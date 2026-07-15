import {useState, useEffect} from 'react';
import {getCurrentWeather, getFiveDayForecast, getCoordinatesByCity} from '~/shared/services/weatherService';

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

export function useWeatherWithLocation(cityParam?: string) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Общая функция загрузки погоды по координатам
    const fetchWeather = async (lat: number, lon: number, geoName?: string) => {
        try {
            const [weatherData, forecastData] = await Promise.all([
                getCurrentWeather(lat, lon),
                getFiveDayForecast(lat, lon),
            ]);
            setData({
                weather: weatherData,
                forecast: forecastData,
                cityName: geoName || weatherData.name,       // если geoName передан — используем его
                weatherCityName: weatherData.name,           // всегда имя из API
            });
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (cityParam) {
            getCoordinatesByCity(cityParam)
                .then((coords) => {
                    if (coords) {
                        fetchWeather(coords.lat, coords.lon, coords.name); // передаём имя из геокодинга
                    } else {
                        setError(`Город "${cityParam}" не найден`);
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setError('Ошибка при поиске города');
                    setLoading(false);
                });
            return;
        }

        if (!navigator.geolocation) {
            fetchWeather(FALLBACK_LAT, FALLBACK_LON);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;
                // Получаем имя через reverse‑геокодинг
                const geoName = await reverseGeocode(latitude, longitude);
                fetchWeather(latitude, longitude, geoName || undefined);
            },
            () => fetchWeather(FALLBACK_LAT, FALLBACK_LON),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 60000}
        );
    }, [cityParam]);

    return {data, isLoading: loading, error};
}