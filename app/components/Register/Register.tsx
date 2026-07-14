import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { RegisterForm } from '~/components/Register/RegisterForm';
import { Icon } from '~/shared/Icon';
import { useAuth } from '~/shared/context/AuthContext';
import type { RegisterFormData } from '~/shared/schemas/auth';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, isLoading, isAuthenticated } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (data: RegisterFormData) => {
        setError('');
        const result = await register(data.name, data.email, data.password);
        if (!result.success && result.error) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen py-2 lg:py-5 px-5 lg:px-22.5 flex flex-col items-center justify-center bg-navy">
            <main className="w-full lg:w-212.5 p-6 lg:py-5 lg:px-13 bg-darkBlue shadow-[0_8px_32px_#09101F] rounded-4xl border border-borderGray mb-4">
                <h2 className="text-lightBlue font-bold text-2xl text-center lg:mb-0 mb-1.5">Create account</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}
                <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
            </main>
            <p className="text-center text-gray font-regular">
                Already have an account?{' '}
                <a href="/" className="text-skyBlue font-bold hover:underline">
                    Sign in
                </a>
            </p>
        </div>
    );
}