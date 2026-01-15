import { transferCookiesToServer } from './base';
import { parse } from 'date-fns';
import { PageDto } from './pagination';

export type CreateGameSessionParams = {
  title: string;
  maxPlayers: number;
  date: string;
  time: string;
};

export type CreateGameSessionResponse = {
  id: string;
  startDate: Date;
  title: string;
  maxPlayers: number;
};

export async function serverCreateGameSession(params: CreateGameSessionParams): Promise<CreateGameSessionResponse> {
  const cookies = await transferCookiesToServer();
  const { title, maxPlayers, time } = params;

  const parsedDate = parse(time, "yyyy-MM-dd'T'HH:mm", new Date());
  const startDate = parsedDate.toISOString();

  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/game-sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies,
    },
    body: JSON.stringify({ title, maxPlayers, startDate }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create session. Unknown Error.' }));
    throw new Error(error.message);
  }

  return response.json();
}

export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
}

export type DashboardParticipantSessionResponseDto = {
  id: string;
  sessionId: string;
  role: 'PLAYER' | 'MASTER';
  user: UserResponseDto;
}

export type DashboardSessionResponseDto = {
  id: string;
  startDate: string;
  title: string;
  maxPlayers: number | null;
  participants: DashboardParticipantSessionResponseDto[];
}

export async function serverGetGameSessions(): Promise<PageDto<DashboardSessionResponseDto>> {
  const cookies = await transferCookiesToServer();

  const response = await fetch(`${process.env.BACKEND_SERVER_URL}/game-sessions?page=1&limit=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to get sessions. Unknown Error.' }));
    throw new Error(error.message);
  }

  return response.json();
}

