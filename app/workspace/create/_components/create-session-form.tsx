'use client';

import { useActionState, useState } from 'react';
import { LabelledInput } from '@/app/_components/input';
import { DatePicker } from '@/app/_components/date-picker';
import { TimePicker } from '@/app/_components/time-picker';
import { createSession, CreateSessionState } from '../_actions/create-session';
import { Spinner } from '@/app/_components/spinner';

import { format } from 'date-fns';

const initialState: CreateSessionState = {
  message: '',
  errors: {},
};

export function CreateSessionForm() {
  const [state, action, isPending] = useActionState(createSession, initialState);

  const [formData, setFormData] = useState({
    title: '',
    maxPlayers: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: format(new Date().setHours(12, 0, 0, 0), "yyyy-MM-dd'T'HH:mm"),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={action} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-5">
        <LabelledInput
          label="Session Title"
          name="title"
          placeholder="e.g. D&D: Lost Mine of Phandelver"
          value={formData.title}
          onChange={(val) => handleChange('title', val)}
          errorMessage={state.errors?.title?.[0]}
        />

        <LabelledInput
          label="Max Players"
          name="maxPlayers"
          placeholder="e.g. 5"
          type="number"
          value={formData.maxPlayers}
          onChange={(val) => handleChange('maxPlayers', val)}
          errorMessage={state.errors?.maxPlayers?.[0]}
        />

        <div className="flex gap-4 w-full">
            <DatePicker
              label="Date"
              name="date"
              value={formData.date}
              onChange={(val) => {
                console.log(val);
                handleChange('date', val)
              }}
              errorMessage={state.errors?.date?.[0]}
            />

            <div className="w-30">
              <TimePicker
                label="Start Time"
                name="time"
                value={formData.time}
                onChange={(val) => {
                  console.log(val);
                  handleChange('time', val)
                }}
                errorMessage={state.errors?.time?.[0]}
              />
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
