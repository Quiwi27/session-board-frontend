'use server'

import { serverSignUp } from '@/app/_server/auth';
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

  try {
    await serverSignUp({ name, email, password });

    return { message: 'Success!' };
  } catch (error: unknown) {
    return { message: `${(error as Error)?.message ?? 'Failed to register user. Unknown Error.'}` };
  }
}
