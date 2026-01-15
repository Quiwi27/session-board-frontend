'use server'

import { serverSignIn } from '@/app/_server/auth';
import { SigninFormSchema } from '../_schemes/schema';
import { redirect, RedirectType } from 'next/navigation';

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

  try {
    await serverSignIn({ email, password });
  } catch (error: unknown) {
    return { message: `${(error as Error)?.message ?? 'Failed to sign in. Unknown Error.'}` };
  }

  redirect('/workspace', RedirectType.replace);
}
