import {useState} from 'react';
import {Icon} from '~/shared/Icon';
import {useSwipeable} from 'react-swipeable';
import type {CurrentWeatherResponse} from '~/shared/services/weatherService';

interface CityCardProps {
    id: string;
    name: string;
    weather: CurrentWeatherResponse | null;
    isEditMode: boolean;
    onSelect: () => void;
    onDelete: (id: string) => void;
}

export function CityCard({id, name, weather, isEditMode, onSelect, onDelete}: CityCardProps) {
    const [swipeOffset, setSwipeOffset] = useState(0);

    const iconUrl = weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png` : '';

    const formatLocalTime = (dt: number, timezoneOffset: number) => {
        const date = new Date((dt + timezoneOffset) * 1000);
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    };

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            if (eventData.deltaX < 0) {
                setSwipeOffset(eventData.deltaX);
            }
        },
        onSwipedLeft: () => {
            if (swipeOffset < -80) {
                onDelete(id);
            } else {
                setSwipeOffset(0);
            }
        },
        onSwipedRight: () => setSwipeOffset(0),
        preventScrollOnSwipe: true,
        delta: 15,
        trackMouse: true
    });

    return (
        <div
            className="group relative overflow-hidden rounded-2xl border border-borderGray bg-darkBlue transition-all hover:border-skyBlue"
        >
            <div className="absolute right-0 inset-y-0 w-24 bg-red-500 flex items-center justify-center">
                <span className="text-white font-medium">Delete</span>
            </div>

            <div
                {...swipeHandlers}
                style={{transform: `translateX(${swipeOffset}px)`}}
                className="flex items-center justify-between p-4 lg:p-5 bg-darkBlue relative z-10 cursor-pointer transition-transform duration-300 ease-out group-hover:-translate-x-6"
                onClick={() => !isEditMode && onSelect()}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-xl bg-darkBlue/50 border border-borderGray flex items-center justify-center text-skyBlue">
                        <Icon name="location_city"/>
                    </div>
                    <div>
                        <h3 className="text-lightBlue font-semibold text-lg">{name}</h3>
                        <p className="text-gray text-xs uppercase tracking-wide mt-0.5">
                            {weather ? formatLocalTime(weather.dt, weather.timezone) : 'Loading...'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {weather ? (
                        <div className="flex items-center gap-3">
                            <img src={iconUrl} alt="icon" className="w-8 h-8"/>
                            <span className="text-lightBlue text-2xl font-light">
                                {Math.round(weather.main.temp)}°
                            </span>
                        </div>
                    ) : (
                        <span className="text-gray text-sm">N/A</span>
                    )}

                    {isEditMode && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(id);
                            }}
                            className="p-2 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-colors"
                        >
                            <Icon name="delete"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}