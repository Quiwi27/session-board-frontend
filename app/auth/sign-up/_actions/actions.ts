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
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Register.',
      }
    }

    const { name, email, password } = validatedFields.data

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Registration data:', { name, email, password });
      // TODO: Handle actual registration response
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        message: 'Database Error: Failed to Register.',
      }
    }

    // Revalidate the cache if needed or redirect
    // revalidatePath('/dashboard')
    // redirect('/dashboard')

    return {
      message: 'User registered successfully!', // This might differ if we redirect
    }
}
