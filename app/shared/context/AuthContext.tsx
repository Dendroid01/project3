import { createContext, useContext, useState, useEffect } from 'react';
import type {ReactNode} from 'react';

type User = {
    email: string;
    name?: string;
};

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
    { email: 'user@example.com', password: 'Password123', name: 'John Doe' },
    { email: 'admin@skyglass.com', password: 'Admin1234', name: 'Admin User' },
    { email: 'test@test.com', password: 'Test12345', name: 'Test User' },
];

const getStoredUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
    } catch {
        localStorage.removeItem('user');
        return null;
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => getStoredUser());
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const stored = getStoredUser();
        setUser(stored);
        setIsInitialized(true);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);

        const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
        if (found) {
            const userData: User = { email: found.email, name: found.name };
            setUser(userData);
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(userData));
            }
            setIsLoading(false);
            return { success: true };
        }

        setIsLoading(false);
        return {
            success: false,
            error: 'Invalid email or password. Try: user@example.com / Password123',
        };
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    };

    if (!isInitialized) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}