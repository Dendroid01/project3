import {useNavigate} from 'react-router';
import {useState, useRef, useEffect} from 'react';
import {Icon} from '~/shared/Icon';

async function searchCities(query: string) {
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

export function DesktopHeader({className}: { className?: string }) {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleSelect = (city: { name: string; lat: number; lon: number }) => {
        setQuery('');
        setShowSuggestions(false);
        navigate(`/dashboard?city=${encodeURIComponent(city.name)}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div className={`flex items-center justify-between w-full gap-6 ${className}`}>
            <form onSubmit={handleSubmit} className="flex-1 max-w-md relative">
                <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray">
            <Icon name="search"/>
          </span>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search any city..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="w-full rounded-full bg-darkBlue border border-borderGray py-2.5 pl-11 pr-4 text-lightBlue placeholder:text-fieldGray focus:outline-none focus:border-skyBlue"
                    />
                    {isSearching && (
                        <span className="absolute inset-y-0 right-3 flex items-center text-gray text-sm">
              <Icon name="progress_activity"/>
            </span>
                    )}
                </div>
                {showSuggestions && suggestions.length > 0 && (
                    <div
                        className="absolute left-0 right-0 mt-1 bg-darkBlue border border-borderGray rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
                        {suggestions.map((city, index) => (
                            <div
                                key={`${city.name}-${city.lat}-${city.lon}-${index}`}
                                className="px-4 py-2 hover:bg-darkBlue/50 cursor-pointer text-lightBlue flex items-center justify-between"
                                onMouseDown={() => handleSelect(city)}
                            >
                                <span>{city.displayName}</span>
                                <span className="text-gray text-xs">
                  {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
                </span>
                            </div>
                        ))}
                    </div>
                )}
            </form>
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-lightBlue font-semibold text-sm">Alex Rivera</p>
                    <p className="text-gray text-xs">Premium Member</p>
                </div>
                <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-skyBlue to-blue flex items-center justify-center text-darkCyan text-xs font-bold overflow-hidden">
                    AR
                </div>
            </div>
        </div>
    );
}