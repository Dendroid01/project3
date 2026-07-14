import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RegisterFormData } from '~/shared/schemas/auth';
import { registerSchema } from '~/shared/schemas/auth';
import { FormField } from '~/shared/FormField';

type RegisterFormProps = {
    onSubmit: (data: RegisterFormData) => void | Promise<void>;
    isLoading?: boolean;
};

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 lg:gap-4" noValidate>
            <FormField
                iconName="person"
                label="Full name"
                type="text"
                placeholder="John Doe"
                error={errors.name?.message}
                {...register('name')}
            />

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
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
            />

            <FormField
                iconName="lock_reset"
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />

            <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-4 bg-blue text-darkCyan rounded-2xl hover:bg-skyBlue disabled:opacity-50 shadow-[0_20px_25px_-5px_rgba(14,165,233,0.1),0_8px_10px_-6px_rgba(14,165,233,0.1)]"
            >
                {isLoading ? 'Loading...' : 'Create account'}
            </button>
        </form>
    );
}