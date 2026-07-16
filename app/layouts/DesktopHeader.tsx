import { useNavigate } from 'react-router';
import type { SubmitEvent } from 'react';
import { useCitySearch } from '~/shared/hooks/useCitySearch';
import { SearchInput } from '~/components/SearchInput';

interface DesktopHeaderProps {
    className?: string;
}

export function DesktopHeader({ className }: DesktopHeaderProps) {
    const navigate = useNavigate();
    const {
        query,
        setQuery,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        isSearching,
        resetSearch,
    } = useCitySearch();

    const handleSelect = (city: { name: string; lat: number; lon: number }) => {
        resetSearch();
        navigate(`/dashboard?city=${encodeURIComponent(city.name)}`);
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div className={`flex items-center justify-between w-full gap-6 ${className}`}>
            <SearchInput
                query={query}
                setQuery={setQuery}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
                isSearching={isSearching}
                onSelect={handleSelect}
                onSubmit={handleSubmit}
            />

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-lightBlue font-semibold text-sm">Alex Rivera</p>
                    <p className="text-gray text-xs">Premium Member</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-skyBlue to-blue flex items-center justify-center text-darkCyan text-xs font-bold overflow-hidden">
                    AR
                </div>
            </div>
        </div>
    );
}