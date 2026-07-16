import {useRef} from 'react';
import type {SubmitEventHandler} from 'react';
import {Icon} from '~/shared/Icon';

interface City {
    name: string;
    country: string;
    lat: number;
    lon: number;
    displayName: string;
}

interface SearchInputProps {
    query: string;
    setQuery: (value: string) => void;
    suggestions: City[];
    showSuggestions: boolean;
    setShowSuggestions: (value: boolean) => void;
    isSearching: boolean;
    onSelect: (city: City) => void;
    onSubmit: SubmitEventHandler<HTMLFormElement>;
    placeholder?: string;
    className?: string;
}

export function SearchInput({
                                query,
                                setQuery,
                                suggestions,
                                showSuggestions,
                                setShowSuggestions,
                                isSearching,
                                onSelect,
                                onSubmit,
                                placeholder = 'Search any city...',
                                className = '',
                            }: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form onSubmit={onSubmit} className={`flex-1 max-w-md relative ${className}`}>
            <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray">
          <Icon name="search"/>
        </span>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
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
                            onMouseDown={() => onSelect(city)}
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
    );
}