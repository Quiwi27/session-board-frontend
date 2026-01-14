'use client';

import { useActionState, useState } from 'react';
import { ControlledInput } from '@/app/_components/input';
import { DatePicker } from '@/app/_components/date-picker';
import { TimePicker } from '@/app/_components/time-picker';
import { createSession, CreateSessionState } from '../_actions/create-session';
import { Spinner } from '@/app/_components/spinner';

const initialState: CreateSessionState = {
  message: '',
  errors: {},
};

export function CreateSessionForm() {
  const [state, action, isPending] = useActionState(createSession, initialState);

  const [formData, setFormData] = useState({
    title: '',
    maxPlayers: '',
    date: '2025-01-01',
    time: '12:00',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={action} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-5">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Session Title</span>
          </label>
          <ControlledInput
            name="title"
            placeholder="e.g. D&D: Lost Mine of Phandelver"
            value={formData.title}
            onChange={(val) => handleChange('title', val)}
            errorMessage={state.errors?.title?.[0]}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
             <span className="label-text font-medium">Max Players</span>
          </label>
          <ControlledInput
            name="maxPlayers"
            placeholder="e.g. 5"
            type="number"
            value={formData.maxPlayers}
            onChange={(val) => handleChange('maxPlayers', val)}
            errorMessage={state.errors?.maxPlayers?.[0]}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-medium">Date</span>
                </label>
                <input type="hidden" name="date" value={formData.date} />
                <DatePicker
                    value={formData.date}
                    onChange={(val) => handleChange('date', val)}
                />
                {state.errors?.date?.[0] && (
                    <span className="text-error text-xs ml-1 mt-1">
                        {state.errors.date[0]}
                    </span>
                )}
            </div>

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-medium">Start Time</span>
                </label>
                <input type="hidden" name="time" value={formData.time} />
                <TimePicker
                    value={formData.time}
                    onChange={(val) => handleChange('time', val)}
                />
                {state.errors?.time?.[0] && (
                    <span className="text-error text-xs ml-1 mt-1">
                        {state.errors.time[0]}
                    </span>
                )}
            </div>
        </div>
      </div>

      {state.message && (
        <div className={`p-3 rounded-lg text-sm text-center font-medium ${
            Object.keys(state.errors || {}).length > 0 ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
        }`}>
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-6 mt-4">
        <button
          className="btn btn-primary w-full text-lg shadow-lg shadow-primary/20"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <Spinner /> : 'Create Session'}
        </button>
      </div>
    </form>
  );
}
