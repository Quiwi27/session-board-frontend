import { SessionCard } from "./_components/session-card";
import Link from "next/link";

// Mock data
const MOCK_SESSIONS = [
  {
    id: 1,
    title: "D&D: Загублена Копальня Фандельвера",
    startAt: new Date(new Date().setDate(new Date().getDate() + 2)), // 2 days from now
    masterName: "Олексій",
    maxPlayers: 5,
    currentPlayers: 3,
  },
  {
    id: 2,
    title: "Call of Cthulhu: Маєток Божевілля",
    startAt: new Date(new Date().setDate(new Date().getDate() + 5)), // 5 days from now
    masterName: "Марія",
    maxPlayers: 4,
    currentPlayers: 4,
  },
  {
    id: 3,
    title: "Cyberpunk Red: Нічне місто",
    startAt: new Date(new Date().setDate(new Date().getDate() + 1)), // 1 day from now
    masterName: "Дмитро",
    maxPlayers: 6,
    currentPlayers: 2,
  },
   {
    id: 4,
    title: "Vampire: The Masquerade - Bloodlines",
    startAt: new Date(new Date().setDate(new Date().getDate() + 10)),
    masterName: "Катерина",
    maxPlayers: 5,
    currentPlayers: 0,
  },
];

export default function WorkspacePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Game Sessions</h1>
        <Link href="/workspace/create" className="btn btn-primary">
          Create Session
        </Link>
      </div>

      {MOCK_SESSIONS.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SESSIONS.map((session) => (
            <SessionCard
              key={session.id}
              title={session.title}
              startAt={session.startAt}
              masterName={session.masterName}
              maxPlayers={session.maxPlayers}
              currentPlayers={session.currentPlayers}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl">No sessions scheduled yet</p>
        </div>
      )}
    </div>
  );
}
