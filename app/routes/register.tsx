import type { Route } from './+types/register';
import RegisterPage from '~/components/Register/Register';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Register' },
        { name: 'description', content: 'Create a new account' },
    ];
}

export default function Register() {
    return <RegisterPage />;
}