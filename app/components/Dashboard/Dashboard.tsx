import {BottomNav} from '~/layouts/BottomNav';
import {DesktopSidebar} from '~/layouts/DesktopSidebar';
import {DesktopHeader} from '~/layouts/DesktopHeader';
import {HeroSection} from './HeroSection';
import {HourlyForecast} from './HourlyForecast';
import {MetricsGrid} from './Metrics/MetricsGrid';
import {DailyForecast} from './DailyForecast';
import {useWeatherWithLocation} from '~/shared/hooks/useWeatherWithLocation';

export default function DashboardPage() {
    const {data, isLoading, error} = useWeatherWithLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy text-lightBlue">
                Loading weather data...
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-navy text-red-400">
                Error: {error || 'No data'}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy flex flex-col lg:flex-row relative">
            <div
                className="hidden lg:block w-64 border-r border-borderGray shrink-0 h-screen sticky top-0 overflow-y-auto">
                <DesktopSidebar/>
            </div>

            <div className="flex-1 flex flex-col min-h-screen">
                <DesktopHeader className="hidden lg:flex px-8 py-4"/>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-4 lg:pt-0 flex flex-col gap-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 flex flex-col">
                            <HeroSection weatherData={data.weather} cityName={data?.cityName}
                                         weatherCityName={data?.weatherCityName}/>
                            <HourlyForecast forecastData={data.forecast}/>
                            <MetricsGrid weatherData={data.weather}/>
                        </div>

                        <div className="w-full lg:w-80 shrink-0">
                            <div className="bg-darkBlue rounded-3xl border border-borderGray h-fit">
                                <DailyForecast forecastData={data.forecast}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <BottomNav/>
            </div>
        </div>
    );
}