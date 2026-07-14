import { Icon } from '~/shared/Icon';

export function DesktopHeader({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-between w-full gap-6 ${className}`}>
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray">
                        <Icon name="search" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search cities..."
                        className="w-full rounded-full bg-darkBlue border border-borderGray py-2.5 pl-11 pr-4 text-lightBlue placeholder:text-fieldGray focus:outline-none focus:border-skyBlue"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-lightBlue font-semibold text-sm">Alex Rivera</p>
                    <p className="text-gray text-xs">Premium Member</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-skyBlue to-blue flex items-center justify-center text-darkCyan text-xs font-bold overflow-hidden">
                    AR
                </div>
            </div>
        </div>
    );
}