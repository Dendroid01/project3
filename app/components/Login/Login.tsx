import {useNavigate} from 'react-router';
import {useState, useEffect} from 'react';
import {LoginForm} from '~/components/Login/LoginForm';
import {Icon} from '~/shared/Icon';
import {useAuth} from '~/shared/context/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const {login, isLoading, isAuthenticated} = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (data: { email: string; password: string; rememberMe?: boolean }) => {
        setError('');
        const result = await login(data.email, data.password);
        if (!result.success && result.error) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen py-16 px-5 flex flex-col items-center justify-center bg-[#0B1326]">
            <header className="w-full flex flex-col items-center justify-center gap-1 mb-16">
                <Icon name="Cloud" size={1.5} filled={true} className="text-[#89CEFF]"/>
                <h1 className="text-[#DAE2FD] font-bold text-2xl">SkyGlass</h1>
                <p className="text-[#BEC8D2] font-regular">Premium atmospheric insights.</p>
            </header>
            <main
                className="w-full p-6 bg-[#171F31] shadow-[0_8px_32px_#09101F] rounded-4xl border border-[#2d3648] mb-4">
                <h2 className="text-[#DAE2FD] font-bold text-2xl text-center mb-1.5">Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}
                <LoginForm onSubmit={handleSubmit}
                           isLoading={isLoading}/>
            </main>
            <p className="text-center text-[#BEC8D2] font-regular">
                Don't have an account? <a href="/register" className="text-[#89CEFF] font-bold hover:underline">Create
                Account</a>
            </p>
        </div>
    );
}