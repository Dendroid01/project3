import type {CurrentWeatherResponse} from '~/shared/services/weatherService';

interface HeroSectionProps {
    weatherData: CurrentWeatherResponse;
    cityName?: string;
    weatherCityName?: string;
}

export function HeroSection({weatherData, cityName, weatherCityName}: HeroSectionProps) {
    if (!weatherData) return null;

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });

    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const mainCity = cityName || weatherCityName || weatherData.name;
    const citiesDiffer = cityName && weatherCityName && cityName !== weatherCityName;

    return (
        <div
            className="lg:bg-darkBlue lg:rounded-3xl lg:border lg:border-borderGray lg:p-11 flex flex-col items-center lg:items-start px-5">
            <h2 className="text-lightBlue text-2xl font-bold">
                {mainCity}
            </h2>

            {citiesDiffer && (
                <p className="text-gray text-sm mt-0.5">
                    <span className="opacity-60">Station:</span> {weatherCityName}
                </p>
            )}

            <p className="text-gray text-sm mt-1">{formattedDate}</p>

            <div className="mt-6 relative lg:hidden">
                <img src={iconUrl} alt={weatherData.weather[0].description} className="size-28"/>
                <div
                    className="absolute -top-2 -right-2 bg-skyBlue text-darkCyan text-[10px] font-bold px-2 py-0.5 rounded-full">LIVE
                </div>
            </div>

            <div className="mt-0 lg:mt-4 text-lightBlue text-7xl font-light tracking-tight">
                {Math.round(weatherData.main.temp)}°
            </div>

            <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start items-center ">
                <p className="text-gray text-lg font-medium lg:mt-0 mt-1 capitalize">
                    {weatherData.weather[0].description}
                </p>
                <div className="flex gap-6 lg:mt-0 mt-3 text-gray font-medium">
                    <span>H: {Math.round(weatherData.main.temp_max)}°</span>
                    <span>L: {Math.round(weatherData.main.temp_min)}°</span>
                </div>
            </div>
        </div>
    );
}