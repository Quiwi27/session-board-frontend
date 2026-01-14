'use server';

import { serverCreateGameSession } from '@/app/_server/game-session';
import { CreateSessionSchema, CreateSessionValues } from '../_schemes/create-session-schema';

export type CreateSessionState = {
  message: string;
  errors?: {
    [K in keyof CreateSessionValues]?: string[];
  };
};

export async function createSession(
  prevState: CreateSessionState,
  formData: FormData
): Promise<CreateSessionState> {
  const validatedFields = CreateSessionSchema.safeParse({
    title: formData.get('title'),
    date: formData.get('date'),
    time: formData.get('time'),
    maxPlayers: formData.get('maxPlayers'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Missing Fields. Failed to Create Session.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await serverCreateGameSession(validatedFields.data);

    return { message: 'Session created successfully!' };
  } catch (error) {
    return { message: `${(error as Error)?.message ?? 'Failed to create session. Unknown Error.'}` };
  }
}
