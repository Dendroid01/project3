import { Icon } from '~/shared/Icon';

const mockDaily = [
    { day: 'Today', icon: 'sunny', pop: 20, min: '16°', max: '26°' },
    { day: 'Tue', icon: 'cloud', pop: 0, min: '16°', max: '21°' },
    { day: 'Wed', icon: 'cloudy_snow', pop: 40, min: '13°', max: '21°' },
    { day: 'Thu', icon: 'rainy', pop: 90, min: '17°', max: '18°' },
    { day: 'Fri', icon: 'sunny', pop: 30, min: '14°', max: '23°' },
];

export function DailyForecast() {
    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lightBlue font-medium">5-DAY FORECAST</h3>
                <Icon name="chevron_right" className="text-gray text-lg" />
            </div>

            <div className="bg-darkBlue rounded-3xl border border-borderGray p-2 divide-y divide-borderGray/50">
                {mockDaily.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 px-2">
                        <span className="text-lightBlue font-medium w-10">{item.day}</span>

                        <div className="flex items-center gap-1 w-8">
                            <Icon name={item.icon} className="text-skyBlue text-xl" />
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
                            <span className="opacity-50">{item.min}</span>
                            <span>{item.max}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DailyForecast;