'use server';

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

  // Mock backend call
  const { title, date, time, maxPlayers } = validatedFields.data;
  console.log('Creating session:', { title, date, time, maxPlayers });

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: 'Session created successfully!',
  };
}
