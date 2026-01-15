import { DashboardSessionResponseDto, serverGetGameSessions } from '@/app/_server/game-session';
import { serverGetMe, UserResponseDto } from '@/app/_server/user';

export async function getDashboardSesssions(): Promise<{ sessions: DashboardSessionResponseDto[], user: UserResponseDto }> {
  const [sessionsResponse, userResponse] = await Promise.all([serverGetGameSessions(), serverGetMe()]);

  return {
    sessions: sessionsResponse.items,
    user: userResponse,
  };
}
