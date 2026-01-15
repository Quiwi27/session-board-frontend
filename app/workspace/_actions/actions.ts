import { DashboardSessionResponseDto, serverGetGameSessions } from '@/app/_server/game-session';

export async function getDashboardSesssions(): Promise<DashboardSessionResponseDto[]> {
  const sessions = await serverGetGameSessions();

  return sessions.items;
}
