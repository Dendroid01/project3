export interface FavoriteCity {
    id: string;
    name: string;
    lat: number;
    lon: number;
}

const STORAGE_KEY = 'favorites';

export const getFavorites = (): FavoriteCity[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const addFavorite = (city: Omit<FavoriteCity, 'id'>) => {
    const favorites = getFavorites();
    const newCity: FavoriteCity = { ...city, id: `${city.name},${city.lat},${city.lon}` };
    if (!favorites.some(f => f.id === newCity.id)) {
        favorites.push(newCity);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
    return favorites;
};

export const removeFavorite = (id: string) => {
    const favorites = getFavorites().filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return favorites;
};

export const isFavorite = (id: string): boolean => {
    return getFavorites().some(f => f.id === id);
};