import MetricCard from './MetricCard';

const metricsData = [
    {title: 'UV INDEX', value: '4', subtitle: 'Moderate', icon: 'wb_sunny', progress: 40},
    {title: 'HUMIDITY', value: '64%', subtitle: 'The dew point is 15°', icon: 'water_drop', progress: 64},
    {title: 'WIND', value: '12 km/h', subtitle: 'NW', icon: 'air', progress: 0},
    {title: 'PRESSURE', value: '1012 hPa', subtitle: '', icon: 'speed', progress: 0},
];

export function MetricsGrid() {
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