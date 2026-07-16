import type {Route} from './+types/favorites';
import {FavoritesPage} from '~/components/Favorites/FavoritesPage';

export function meta({}: Route.MetaArgs) {
    return [
        {title: 'Favorites'},
        {name: 'description', content: 'Your favorite cities'},
    ];
}

export default function Favorites() {
    return <FavoritesPage/>;
}