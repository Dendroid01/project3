import { useState, useEffect } from 'react';

interface City {
    name: string;
    country: string;
    lat: number;
    lon: number;
    displayName: string;
}

async function searchCities(query: string): Promise<City[]> {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.map((item: any) => ({
        name: item.name,
        country: item.country,
        lat: item.lat,
        lon: item.lon,
        displayName: `${item.name}, ${item.country}`,
    }));
}

export function useCitySearch() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsSearching(true);
                const results = await searchCities(query);
                setSuggestions(results);
                setShowSuggestions(true);
                setIsSearching(false);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [query]);

    const resetSearch = () => {
        setQuery('');
        setShowSuggestions(false);
    };

    return {
        query,
        setQuery,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        isSearching,
        resetSearch,
    };
}