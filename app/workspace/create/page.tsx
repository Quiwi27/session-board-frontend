import { CreateSessionForm } from './_components/create-session-form';

export default function CreateSessionPage() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-lg bg-base-100 rounded-3xl p-8 md:p-12 shadow-2xl border border-base-200">
        <div className="flex flex-col items-center justify-center mb-10 text-center space-y-2">
          <h1 className="font-bold text-3xl md:text-4xl tracking-tight text-base-content">
            Create Session
          </h1>
          <p className="text-base-content/60 text-lg">
            Schedule a new game for players to join
          </p>
        </div>
        <CreateSessionForm />
      </div>
    </div>
  );
}
