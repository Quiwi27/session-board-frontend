import { z } from 'zod';

export const SignupFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(6, { message: 'Be at least 6 characters long' }).trim(),
    confirmPassword: z.string().trim(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type SignupFormState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string;
};
