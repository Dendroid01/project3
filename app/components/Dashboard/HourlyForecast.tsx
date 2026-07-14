import { Icon } from '~/shared/Icon';

const mockHourly = [
    { time: 'Now', temp: '22°', icon: 'sunny' },
    { time: '2 PM', temp: '24°', icon: 'partly_cloudy_day' },
    { time: '3 PM', temp: '25°', icon: 'cloud' },
    { time: '4 PM', temp: '24°', icon: 'cloud' },
];

export function HourlyForecast() {
    return (
        <div className="mt-4 px-5">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lightBlue font-medium">HOURLY FORECAST</h3>
                <Icon name="chevron_right" className="text-gray text-lg" />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {mockHourly.map((item, index) => (
                    <div key={index} className="flex flex-col items-center min-w-15 bg-darkBlue/50 rounded-2xl p-3 border border-borderGray">
                        <span className="text-gray text-xs">{item.time}</span>
                        <Icon name={item.icon} className="text-3xl text-skyBlue my-2" />
                        <span className="text-lightBlue font-bold text-sm">{item.temp}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HourlyForecast;