import {Icon} from '~/shared/Icon';

export interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
    progress?: number;
}

export function MetricCard({title, value, subtitle, icon, progress = 0}: MetricCardProps) {
    return (
        <div className="bg-darkBlue rounded-3xl p-4 border border-borderGray flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <span className="text-gray text-xs font-bold tracking-wider">{title}</span>
                <Icon name={icon} className="text-skyBlue text-lg opacity-70"/>
            </div>

            <div className="mt-auto">
                <div className="text-lightBlue text-2xl font-semibold">{value}</div>
                {subtitle && <div className="text-gray text-xs">{subtitle}</div>}

                {progress > 0 && (
                    <div className="w-full h-1.5 bg-borderGray rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-skyBlue rounded-full" style={{width: `${progress}%`}}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MetricCard;