type IconProps = {
    name: string;
    className?: string;
    filled?: boolean;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    grade?: -25 | 0 | 25;
};

export function Icon({
                         name,
                         className = "",
                         filled = false,
                         weight = 400,
                         grade = 0,
                     }: IconProps) {
    return (
        <span
            className={`material-symbols-outlined ${className}`}
            style={{
                fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}`,
            }}
        >
            {name}
        </span>
    );
}