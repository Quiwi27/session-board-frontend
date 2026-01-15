import { DashboardParticipantSessionResponseDto } from '@/app/_server/game-session';

interface SessionCardProps {
  startAt: Date;
  title: string;
  maxPlayers: number | null;
  participants: DashboardParticipantSessionResponseDto[];
}

export function SessionCard({
  startAt,
  title,
  maxPlayers,
  participants,
}: SessionCardProps) {
  const formattedDate = new Intl.DateTimeFormat('uk-UA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(startAt);

  const players = participants.filter((participant) => participant.role === 'PLAYER');
  const master = participants.find((participant) => participant.role === 'MASTER');

  const currentPlayers = players.length;

  const disableJoin = maxPlayers != null && currentPlayers >= maxPlayers;

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title text-primary">{title}</h2>
        <p className="text-sm text-base-content/70 pb-2">
          Start: <span className="font-semibold">{formattedDate}</span>
        </p>

        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between items-center text-sm">
            <span>Master:</span>
            <span className="font-medium">{master?.user.name ?? 'Unknown'}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
             <span>Players:</span>
             <span className="badge badge-neutral badge-lg">
                {currentPlayers} / {maxPlayers}
             </span>
          </div>

          <div className="card-actions justify-end mt-4">
             <button
               className="btn btn-primary btn-sm w-full"
               disabled={disableJoin}
             >
               Join
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
