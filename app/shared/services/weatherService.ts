const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface WindData {
    speed: number;
    deg: number;
    gust?: number;
}

export interface CurrentWeatherResponse {
    name: string;
    main: MainWeatherData;
    weather: WeatherCondition[];
    wind: WindData;
    visibility: number;
    clouds: { all: number };
    dt: number;
    timezone: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
}

export interface ForecastItem {
    dt: number;
    dt_txt: string;
    main: MainWeatherData & { temp_kf?: number };
    weather: WeatherCondition[];
    wind: WindData;
    pop: number;
    visibility: number;
    clouds: { all: number };
}

export interface ForecastResponse {
    list: ForecastItem[];
    city: {
        name: string;
        coord: { lat: number; lon: number };
        country: string;
    };
}

export type WeatherApiResponse = {
    current: CurrentWeatherResponse;
    hourly: ForecastItem[];
    daily: DailyForecastItem[];
};

export interface DailyForecastItem {
    dt: number;
    temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    };
    weather: WeatherCondition[];
    pop: number;
    humidity: number;
    wind_speed: number;
}

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse> {
    const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch current weather');
    return response.json();
}

export async function getFiveDayForecast(lat: number, lon: number): Promise<ForecastResponse> {
    const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch forecast');
    return response.json();
}

export const fetchWeather = getCurrentWeather;
export const fetchCityName = async (lat: number, lon: number): Promise<string> => {
    const data = await getCurrentWeather(lat, lon);
    return data.name;
};

export async function getCoordinatesByCity(city: string): Promise<{ lat: number; lon: number; name: string } | null> {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || data.length === 0) return null;
    return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
    };
}