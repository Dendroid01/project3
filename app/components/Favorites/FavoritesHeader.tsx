interface FavoritesHeaderProps {
    isEditMode: boolean;
    onToggleEdit: () => void;
}

export function FavoritesHeader({ isEditMode, onToggleEdit }: FavoritesHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lightBlue text-2xl font-bold">Manage Cities</h2>
            <button
                onClick={onToggleEdit}
                className="text-skyBlue font-medium hover:underline transition-colors"
            >
                {isEditMode ? 'Done' : 'Edit'}
            </button>
        </div>
    );
}