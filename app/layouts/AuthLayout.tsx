import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '~/shared/context/AuthContext';

export default function AuthLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1326]">
                <div className="text-[#DAE2FD]">Loading...</div>
            </div>
        );
    }

    return <Outlet />;
}