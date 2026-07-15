import type { ForecastItem } from '~/shared/services/weatherService';

export interface DailyForecastData {
    day: string;
    icon: string;
    description: string;
    pop: number;
    min: number;
    max: number;
}

export function groupForecastByDay(list: ForecastItem[]): DailyForecastData[] {
    const days: { [key: string]: ForecastItem[] } = {};
    list.forEach((item) => {
        const date = new Date(item.dt_txt).toDateString();
        if (!days[date]) days[date] = [];
        days[date].push(item);
    });

    return Object.entries(days).map(([date, items]) => {
        const temps = items.map((i) => i.main.temp);
        const pops = items.map((i) => i.pop || 0);
        const weather = items[0].weather[0];
        return {
            day: date,
            icon: weather.icon,
            description: weather.description,
            pop: Math.round(Math.max(...pops) * 100),
            min: Math.round(Math.min(...temps)),
            max: Math.round(Math.max(...temps)),
        };
    });
}

export function formatDay(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'Today';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}