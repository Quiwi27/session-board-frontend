import setCookieParser from 'set-cookie-parser';
import { cookies as nextCookies } from 'next/headers';

export async function transferCookiesToClient(response: Response) {
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

export async function transferCookiesToServer(): Promise<string> {
  const cookieStore = await nextCookies();

  return cookieStore.toString();
}
