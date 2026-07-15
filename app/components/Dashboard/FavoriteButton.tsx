import {useState, useEffect} from 'react';
import {Icon} from '~/shared/Icon';
import {addFavorite, removeFavorite, isFavorite} from '~/shared/services/favoritesService';
import type {CurrentWeatherResponse} from '~/shared/services/weatherService';

interface FavoriteButtonProps {
    weatherData: CurrentWeatherResponse;
    cityName?: string;
}

export function FavoriteButton({weatherData, cityName}: FavoriteButtonProps) {
    const [isFav, setIsFav] = useState(false);

    const currentCity = cityName || weatherData?.name;
    const cityId = weatherData?.coord
        ? `${currentCity},${weatherData.coord.lat},${weatherData.coord.lon}`
        : '';

    useEffect(() => {
        if (cityId) {
            setIsFav(isFavorite(cityId));
        }
    }, [cityId]);

    const handleToggleFavorite = () => {
        if (!weatherData || !currentCity) return;
        const city = {
            name: currentCity,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
        };
        if (isFav) {
            removeFavorite(cityId);
            setIsFav(false);
        } else {
            addFavorite(city);
            setIsFav(true);
        }
    };

    return (
        <button
            onClick={handleToggleFavorite}
            className="flex items-center gap-2 px-4 py-2 bg-darkBlue/50 rounded-full border border-borderGray hover:border-skyBlue transition-colors"
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Icon
                name={isFav ? 'star' : 'star_border'}
                filled={isFav}
                className="text-xl text-skyBlue"
            />
            <span className="text-lightBlue text-sm font-medium">
                Add to favorites
      </span>
        </button>
    );
}