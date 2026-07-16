import { Icon } from '~/shared/Icon';

interface HourlyForecastProps {
    forecastData: any;
}

export function HourlyForecast({ forecastData }: HourlyForecastProps) {
    if (!forecastData) return null;

    const hourly = forecastData.list.slice(0, 8);

    const formatTime = (dt_txt: string) => {
        const date = new Date(dt_txt);
        const hours = date.getHours();
        if (hours === 0) return '12 AM';
        if (hours === 12) return '12 PM';
        return hours < 12 ? `${hours} AM` : `${hours - 12} PM`;
    };

    return (
        <div className="mt-4 px-5">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lightBlue font-medium">HOURLY FORECAST</h3>
                <Icon name="chevron_right" className="text-gray text-lg" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {hourly.map((item: any, index: number) => {
                    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
                    return (
                        <div key={index} className="flex flex-col items-center min-w-15 bg-darkBlue/50 rounded-2xl p-3 border border-borderGray">
                            <span className="text-gray text-xs">
                                {index === 0 ? 'Now' : formatTime(item.dt_txt)}
                            </span>
                            <img src={iconUrl} alt={item.weather[0].description} className="w-10 h-10 my-2" />
                            <span className="text-lightBlue font-bold text-sm">
                                {Math.round(item.main.temp)}°
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}