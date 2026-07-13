import { z } from 'zod';

const baseAuthSchema = {
    email: z.string().email('Введите корректный email'),
    password: z.string()
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .regex(/[A-Z]/, 'Пароль должен содержать заглавную букву')
        .regex(/[0-9]/, 'Пароль должен содержать цифру'),
};

export const loginSchema = z.object({
    ...baseAuthSchema,
    rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
    ...baseAuthSchema,
    name: z.string().min(2, 'Имя обязательно'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;