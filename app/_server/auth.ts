import setCookieParser from 'set-cookie-parser';
import { cookies as nextCookies } from 'next/headers';

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

export async function collectCookies(response: Response) {
  const setCookieHeader = response.headers.get('set-cookie');

  if (!setCookieHeader) return;

  const parsedCookies = setCookieParser.parse(setCookieHeader);
  const cookieStore = await nextCookies();

  for (const c of parsedCookies) {
    cookieStore.set({
      name: c.name,
      value: c.value,
      path: c.path ?? '/',
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite as 'lax' | 'strict' | 'none' | undefined,
      expires: c.expires,
      maxAge: c.maxAge,
    })
  }
}