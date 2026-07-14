import {Icon} from '~/shared/Icon';

export function HeroSection() {
    return (
        <div
            className="lg:bg-darkBlue lg:rounded-3xl lg:border lg:border-borderGray lg:p-[64px] flex flex-col items-center lg:items-start px-5">
            <h2 className="text-lightBlue text-2xl font-bold">San Francisco</h2>
            <p className="text-gray text-sm mt-1">Monday, Oct 24</p>

            <div className="mt-6 relative lg:hidden">
                {/* В реальности тут будет <img src="https://openweathermap.org/img/wn/..." />, но для UI используем иконку */}
                <div className="flex items-center justify-center">
                    <Icon name="partly_cloudy_day" className="text-[100px]! text-skyBlue" filled/>
                </div>
                <div
                    className="absolute -top-2 -right-2 bg-skyBlue text-darkCyan text-[10px] font-bold px-2 py-0.5 rounded-full">
                    LIVE
                </div>
            </div>

            <div className="mt-4 text-lightBlue text-7xl font-light tracking-tight">
                22°
            </div>

            <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center lg:items-start">

            <p className="text-gray text-lg font-medium lg:mt-0 mt-1">Partly Cloudy</p>

            <div className="flex gap-6 mt-3 lg:mt-0 items-center text-gray font-medium">
                <span>H: 26°</span>
                <span>L: 14°</span>
            </div>

            </div>
        </div>
    );
}

export default HeroSection;