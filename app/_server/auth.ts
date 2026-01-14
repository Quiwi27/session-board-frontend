import { collectCookies } from './base';

export type SignInParams = {
  email: string;
  password: string;
};

export async function serverSignIn({ email, password }: SignInParams) {
  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/auth/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to sign in. Unknown Error.' }));

    throw new Error(error.message);
  }

  await collectCookies(response);
}

export type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

export async function serverSignUp({ name, email, password }: SignUpParams) {
  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to register user. Unknown Error.' }));
    throw new Error(error.message);
  }
}
