import { Icon } from '~/shared/Icon';

interface LocalSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function LocalSearchInput({
                                     value,
                                     onChange,
                                     placeholder = 'Search in favorites...',
                                     className = '',
                                 }: LocalSearchInputProps) {
    return (
        <div className={`relative ${className}`}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray">
                <Icon name="search" />
            </span>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-full bg-darkBlue border border-borderGray py-2.5 pl-11 pr-4 text-lightBlue placeholder:text-fieldGray focus:outline-none focus:border-skyBlue"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute inset-y-0 right-3 flex items-center text-gray hover:text-lightBlue"
                >
                    <Icon name="close" />
                </button>
            )}
        </div>
    );
}