import { Icon } from '~/shared/Icon';

export function TopBar() {
    return (
        <div className="flex items-center justify-between px-5 py-2 bg-navy text-white">
            <h1 className="text-xl font-bold tracking-tight text-lightBlue">SkyGlass</h1>
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Icon name="search" className="text-2xl text-lightBlue" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Icon name="settings" className="text-2xl text-lightBlue" />
                </button>
            </div>
        </div>
    );
}

export default TopBar;