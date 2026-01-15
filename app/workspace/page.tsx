import { DashboardSessionResponseDto } from '../_server/game-session';
import { UserResponseDto } from '../_server/user';
import { getDashboardSesssions } from './_actions/actions';
import { SessionCard } from "./_components/session-card";
import Link from "next/link";

export default async function WorkspacePage() {
  const { sessions, user } = await getDashboardSesssions();
  const content = sessions.length > 0 ? <SessionGrid sessions={sessions} user={user} /> : <NotFoundSessions />;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Game Sessions</h1>
        <Link href="/workspace/create" className="btn btn-primary">
          Create Session
        </Link>
      </div>
      {content}
    </div>
  );
}

function SessionGrid({ sessions, user }: { sessions: DashboardSessionResponseDto[], user: UserResponseDto }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          title={session.title}
          startAt={new Date(session.startDate)}
          maxPlayers={session.maxPlayers}
          participants={session.participants}
          userId={user.id}
        />
      ))}
    </div>
  );
}

function NotFoundSessions() {
  return (
    <div className="text-center py-20 opacity-50">
      <p className="text-xl">No sessions scheduled yet</p>
    </div>
  );
}
