import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginFormData } from '~/shared/schemas/auth';
import { loginSchema } from '~/shared/schemas/auth';
import { FormField } from '~/shared/FormField';


type LoginFormProps = {
    onSubmit: (data: LoginFormData) => void | Promise<void>;
    isLoading?: boolean;
};

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { rememberMe: false },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
                iconName="email"
                label="Email address"
                type="email"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register('email')}
            />

            <FormField
                iconName="lock"
                label="Пароль"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                link={{ text: 'Забыли пароль?', href: '/forgot-password' }}
                {...register('password')}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#0EA5E9] text-[#003751] rounded-2xl hover:bg-[#89CEFF] disabled:opacity-50 shadow-[0_20px_25px_-5px_rgba(14,165,233,0.1),0_8px_10px_-6px_rgba(14,165,233,0.1)]"
            >
                {isLoading ? 'Loading...' : 'Sign in'}
            </button>
        </form>
    );
}