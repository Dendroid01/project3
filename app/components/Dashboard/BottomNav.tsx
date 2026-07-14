import {NavLink, useLocation} from 'react-router';
import {Icon} from '~/shared/Icon';

export function BottomNav() {
    const location = useLocation();

    const tabs = [
        {id: 'weather', label: 'Weather', icon: 'sunny', path: '/dashboard'},
        {id: 'search', label: 'Search', icon: 'search', path: '/search'},
        {id: 'settings', label: 'Settings', icon: 'settings', path: '/settings'},
    ];

    return (
        <div
            className="sticky bottom-0 left-0 right-0 flex justify-around bg-darkBlue border-t border-borderGray py-2 pb-safe z-50">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.id}
                    to={tab.path}
                    className={({isActive}) =>
                        `flex flex-col items-center gap-1 flex-1 no-underline ${
                            isActive ? 'text-skyBlue' : 'text-gray'
                        }`
                    }
                >
                    {({isActive}) => (
                        <>
                            <Icon
                                name={tab.icon}
                                filled={isActive}
                                className={`text-2xl ${isActive ? 'text-skyBlue' : 'text-gray'}`}
                            />
                            <span className={`text-[10px] ${isActive ? 'text-skyBlue' : 'text-gray'}`}>
                {tab.label}
              </span>
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    );
}