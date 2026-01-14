'use server'

import { SigninFormSchema } from '../_schemes/schema';

export type SigninFormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function signin(prevState: SigninFormState, formData: FormData): Promise<SigninFormState> {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid Credentials.',
    }
  }

  const { email, password } = validatedFields.data

  // TODO: Add cookie session management here later
  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to sign in. Unknown Error.' }));
    return {
        message: error.message,
    };
  }

  return {
    message: 'Success!', // Or redirect
  };
}
