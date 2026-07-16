import {useSearchParams, useNavigate} from 'react-router';
import type {SubmitEvent} from 'react';
import {BottomNav} from '~/layouts/BottomNav';
import {DesktopSidebar} from '~/layouts/DesktopSidebar';
import {DesktopHeader} from '~/layouts/DesktopHeader';
import {HeroSection} from './HeroSection';
import {HourlyForecast} from './HourlyForecast';
import {MetricsGrid} from './Metrics/MetricsGrid';
import {DailyForecast} from './DailyForecast';
import {FavoriteButton} from './FavoriteButton';
import {useWeatherWithLocation} from '~/shared/hooks/useWeatherWithLocation';
import {useCitySearch} from '~/shared/hooks/useCitySearch';
import {SearchInput} from '~/components/SearchInput';

export default function DashboardPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const city = searchParams.get('city') || undefined;
    const {data, isLoading, error} = useWeatherWithLocation(city);

    const {
        query,
        setQuery,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        isSearching,
        resetSearch,
    } = useCitySearch();

    const handleCitySelect = (city: { name: string; lat: number; lon: number }) => {
        resetSearch();
        navigate(`/dashboard?city=${encodeURIComponent(city.name)}`);
    };

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleCitySelect(suggestions[0]);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy text-lightBlue">
                Loading weather data...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy text-red-400">
                Error: {error || 'No data'}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy flex flex-col lg:flex-row relative">
            <div
                className="hidden lg:block w-64 border-r border-borderGray shrink-0 h-screen sticky top-0 overflow-y-auto">
                <DesktopSidebar/>
            </div>

            <div className="flex-1 flex flex-col min-h-screen">
                <DesktopHeader className="hidden lg:flex px-8 py-4"/>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-4 lg:pt-0 flex flex-col gap-6">
                    {/* Мобильный поиск */}
                    <div className="lg:hidden">
                        <SearchInput
                            query={query}
                            setQuery={setQuery}
                            suggestions={suggestions}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            isSearching={isSearching}
                            onSelect={handleCitySelect}
                            onSubmit={handleSubmit}
                            placeholder="Search any city..."
                            className="max-w-full"
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 flex flex-col">
                            <HeroSection
                                weatherData={data.weather}
                                cityName={data?.cityName}
                                weatherCityName={data?.weatherCityName}
                            />
                            <HourlyForecast forecastData={data.forecast}/>
                            <MetricsGrid weatherData={data.weather}/>
                        </div>

                        <div className="w-full lg:w-80 shrink-0 flex flex-col justify-between">
                            <div className="bg-darkBlue rounded-3xl border border-borderGray h-fit">
                                <DailyForecast forecastData={data.forecast}/>
                            </div>
                            <div className="p-4 pb-0 flex justify-end">
                                <FavoriteButton
                                    weatherData={data.weather}
                                    cityName={data?.cityName}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <BottomNav/>
            </div>
        </div>
    );
}