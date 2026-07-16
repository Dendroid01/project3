import {NavLink} from 'react-router';
import {Icon} from '~/shared/Icon';

export function DesktopSidebar() {
    const menuItems = [
        {label: 'Weather', icon: 'cloud', to: '/dashboard'},
        {label: 'Favorites', icon: 'location_city', to: '/favorites'},
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
                        className={({isActive}) =>
                            `flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-colors ${
                                isActive
                                    ? 'bg-skyBlue text-darkCyan'
                                    : 'text-gray hover:bg-darkBlue/50 hover:text-lightBlue'
                            }`
                        }
                    >
                        {({isActive}) => (
                            <>
                                <Icon name={item.icon} filled={isActive} className="text-2xl"/>
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-borderGray pt-4">
                <NavLink to="/settings"
                         className="flex items-center gap-4 px-4 py-2 text-gray hover:text-lightBlue transition-colors">
                    <Icon name="settings" className="text-xl"/> Settings
                </NavLink>
            </div>
        </div>
    );
}