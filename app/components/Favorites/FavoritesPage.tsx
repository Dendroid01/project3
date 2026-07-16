import {useNavigate} from 'react-router';
import {useState, useEffect, useMemo} from 'react';
import {Icon} from '~/shared/Icon';
import {getFavorites, removeFavorite} from '~/shared/services/favoritesService';
import {getCurrentWeather} from '~/shared/services/weatherService';
import type {CurrentWeatherResponse} from "~/shared/services/weatherService";
import {LocalSearchInput} from './LocalSearchInput';

import {CityCard} from './CityCard';
import {FavoritesHeader} from './FavoritesHeader';

import {DesktopSidebar} from '~/layouts/DesktopSidebar';
import {BottomNav} from '~/layouts/BottomNav';

interface FavoriteCityData {
    id: string;
    name: string;
    lat: number;
    lon: number;
}

interface CityWithWeather extends FavoriteCityData {
    weather: CurrentWeatherResponse | null;
}

export function FavoritesPage() {
    const navigate = useNavigate();

    const [citiesWithWeather, setCitiesWithWeather] = useState<CityWithWeather[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // <- ПЕРЕМЕСТИЛИ ВНУТРЬ КОМПОНЕНТА

    useEffect(() => {
        const loadFavorites = async () => {
            const favList = getFavorites();

            const weatherPromises = favList.map(async (city) => {
                try {
                    const weather = await getCurrentWeather(city.lat, city.lon);
                    return {...city, weather};
                } catch {
                    return {...city, weather: null};
                }
            });

            const results = await Promise.all(weatherPromises);
            setCitiesWithWeather(results);
        };
        loadFavorites();
    }, []);

    const handleRemove = (id: string) => {
        removeFavorite(id);
        setCitiesWithWeather(prev => prev.filter(c => c.id !== id));
    };

    const handleSelect = (city: any) => {
        navigate(`/dashboard?city=${encodeURIComponent(city.name)}`);
    };

    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return citiesWithWeather;
        const q = searchQuery.toLowerCase().trim();
        return citiesWithWeather.filter(city => city.name.toLowerCase().includes(q));
    }, [citiesWithWeather, searchQuery]);

    return (
        <div className="flex min-h-screen bg-navy">
            <div
                className="hidden lg:block w-64 border-r border-borderGray shrink-0 h-screen sticky top-0 overflow-y-auto">
                <DesktopSidebar/>
            </div>

            <div className="flex-1 flex flex-col min-h-screen">
                <div className="lg:hidden p-4 bg-navy border-b border-borderGray">
                    <h1 className="text-lightBlue text-xl font-bold">SkyGlass</h1>
                </div>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative pb-32 lg:pb-8">
                    <div className="mb-6">
                        <LocalSearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search in favorites..."
                        />
                        {searchQuery && (
                            <p className="text-gray text-sm mt-2">
                                Found {filteredCities.length} of {citiesWithWeather.length} cities
                            </p>
                        )}
                    </div>

                    <FavoritesHeader
                        isEditMode={isEditMode}
                        onToggleEdit={() => setIsEditMode(!isEditMode)}
                    />

                    {citiesWithWeather.length === 0 ? (
                        <div className="bg-darkBlue rounded-3xl border border-borderGray p-8 text-center">
                            <p className="text-gray text-lg">No cities added yet.</p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="mt-4 px-6 py-2 bg-blue text-darkCyan rounded-xl hover:bg-skyBlue transition-colors"
                            >
                                Search for a city
                            </button>
                        </div>
                    ) : filteredCities.length === 0 ? (
                        <div className="bg-darkBlue rounded-3xl border border-borderGray p-8 text-center">
                            <p className="text-gray text-lg">No cities match "{searchQuery}"</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 px-6 py-2 bg-darkBlue/50 text-lightBlue rounded-xl border border-borderGray hover:border-skyBlue transition-colors"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredCities.map((city) => (
                                <CityCard
                                    key={city.id}
                                    id={city.id}
                                    name={city.name}
                                    weather={city.weather}
                                    isEditMode={isEditMode}
                                    onSelect={() => handleSelect(city)}
                                    onDelete={handleRemove}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="lg:hidden">
                    <BottomNav/>
                </div>
            </div>
        </div>
    );
}