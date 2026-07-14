import { NavLink } from 'react-router';
import { Icon } from '~/shared/Icon';

export function DesktopSidebar() {
    const menuItems = [
        { label: 'Weather', icon: 'cloud', to: '/dashboard' },
        { label: 'Cities', icon: 'location_city', to: '/cities' },
        { label: 'Maps', icon: 'map', to: '/maps' },
        { label: 'Insights', icon: 'analytics', to: '/insights' },
    ];

    return (
        <div className="h-full flex flex-col bg-darkBlue p-6">
            <div className="mb-10">
                <h1 className="text-white font-bold text-xl">SkyGlass</h1>
                <p className="text-gray text-xs uppercase tracking-widest mt-1">Premium Weather</p>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-colors ${
                                isActive
                                    ? 'bg-skyBlue text-darkCyan'
                                    : 'text-gray hover:bg-darkBlue/50 hover:text-lightBlue'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon name={item.icon} filled={isActive} className="text-2xl" />
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="my-6">
                <button className="w-full bg-skyBlue text-darkCyan py-4 rounded-2xl font-bold hover:bg-lightBlue transition-colors shadow-[0_20px_25px_-5px_rgba(14,165,233,0.1)]">
                    Add New City
                </button>
            </div>

            <div className="flex flex-col gap-2 border-t border-borderGray pt-4">
                <NavLink to="/settings" className="flex items-center gap-4 px-4 py-2 text-gray hover:text-lightBlue transition-colors">
                    <Icon name="settings" className="text-xl" /> Settings
                </NavLink>
                <NavLink to="/support" className="flex items-center gap-4 px-4 py-2 text-gray hover:text-lightBlue transition-colors">
                    <Icon name="help" className="text-xl" /> Support
                </NavLink>
            </div>
        </div>
    );
}