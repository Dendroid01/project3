import MetricCard from './MetricCard';

interface MetricsGridProps {
    weatherData: any;
}

export function MetricsGrid({weatherData}: MetricsGridProps) {
    if (!weatherData) return null;

    const {main, wind, visibility} = weatherData;

    const windDirection = (deg: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(deg / 45) % 8];
    };

    const metricsData = [
        {
            title: 'HUMIDITY',
            value: `${main.humidity}%`,
            subtitle: `Dew point is ${Math.round(main.temp - (100 - main.humidity) / 5)}°`,
            icon: 'water_drop',
            progress: main.humidity,
        },
        {
            title: 'WIND',
            value: `${Math.round(wind.speed * 3.6)} km/h`,
            subtitle: windDirection(wind.deg),
            icon: 'air',
            progress: 0,
        },
        {
            title: 'PRESSURE',
            value: `${main.pressure} hPa`,
            subtitle: '',
            icon: 'speed',
            progress: 0,
        },
        {
            title: 'VISIBILITY',
            value: `${(visibility / 1000).toFixed(1)} km`,
            subtitle: '',
            icon: 'visibility',
            progress: 0,
        },
    ];

    return (
        <div className="px-5 py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metricsData.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>
        </div>
    );
}

export default MetricsGrid;