import { Icon } from '~/shared/Icon';
import { groupForecastByDay, formatDay } from '~/shared/utils/forecastUtils';
import type { ForecastResponse } from '~/shared/services/weatherService';

interface DailyForecastProps {
    forecastData: ForecastResponse | null;
}

export function DailyForecast({ forecastData }: DailyForecastProps) {
    if (!forecastData) return null;

    const daily = groupForecastByDay(forecastData.list);

    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lightBlue font-medium">5-DAY FORECAST</h3>
                <Icon name="chevron_right" className="text-gray text-lg" />
            </div>
            <div className="bg-darkBlue rounded-3xl border border-borderGray p-2 divide-y divide-borderGray/50">
                {daily.map((item, index) => {
                    const iconUrl = `https://openweathermap.org/img/wn/${item.icon}.png`;
                    return (
                        <div key={index} className="flex items-center justify-between py-3 px-2">
                            <span className="text-lightBlue font-medium w-10">{formatDay(item.day)}</span>
                            <div className="flex items-center gap-1 w-8">
                                <img src={iconUrl} alt={item.description} className="w-8 h-8" />
                            </div>
                            <div className="flex items-center gap-1 text-gray text-xs w-12">
                                {item.pop > 0 && (
                                    <>
                                        <Icon name="water_drop" className="text-skyBlue text-sm" />
                                        <span>{item.pop}%</span>
                                    </>
                                )}
                            </div>
                            <div className="flex gap-3 text-lightBlue font-medium text-sm">
                                <span className="opacity-50">{item.min}°</span>
                                <span>{item.max}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}