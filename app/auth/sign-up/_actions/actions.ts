'use server'

import { SignupFormSchema } from '../_schemes/schema';

export type SignupFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
};

export async function signup(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    }
  }

  const { name, email, password } = validatedFields.data

  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to register user. Unknown Error.' }));
    return {
      message: error.message,
    };
  }

  return {
    message: '',
  };
}
