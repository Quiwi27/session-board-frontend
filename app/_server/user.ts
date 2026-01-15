import { transferCookiesToServer } from './base';

export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
}

export async function serverGetMe(): Promise<UserResponseDto> {
  const cookies = await transferCookiesToServer();

  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to get yourself' }));
    throw new Error(error.message);
  }

  return response.json();
}
