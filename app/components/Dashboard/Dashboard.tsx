import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { HeroSection } from './HeroSection';
import { HourlyForecast } from './HourlyForecast';
import { MetricsGrid } from './Metrics/MetricsGrid';
import {DailyForecast} from './DailyForecast';

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-navy flex flex-col relative">
            <TopBar />

            <div className="flex-1 overflow-y-auto pb-safe">
                <HeroSection />
                <HourlyForecast />
                <MetricsGrid />
                <DailyForecast />
            </div>


            <BottomNav />

        </div>
    );
}