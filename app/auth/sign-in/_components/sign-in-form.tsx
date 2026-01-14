'use client';

import { useActionState, useState } from 'react';
import { ControlledInput } from '@/app/_components/input';
import Link from 'next/link';
import { signin, SigninFormState } from '../_actions/actions';
import { Spinner } from '@/app/_components/spinner';

const initialState: SigninFormState = {
  message: '',
  errors: {},
};

export function SignInForm() {
  const [state, action, isPending] = useActionState(signin, initialState);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field: string, value: string) => {
     setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form action={action} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-5">
        <ControlledInput
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(val) => handleChange('email', val)}
          errorMessage={state.errors?.email?.[0]}
        />
        <ControlledInput
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(val) => handleChange('password', val)}
          errorMessage={state.errors?.password?.[0]}
        />
      </div>

      {state.message && (
        <div className={`p-3 rounded-lg text-sm text-center font-medium ${state.message === 'Success!' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-6 mt-2">
        <button
          className="btn btn-primary w-full text-lg font-normal tracking-wide shadow-lg shadow-primary/20"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <Spinner /> : 'Sign In'}
        </button>
        <p className="text-center text-base-content/70">
          Not registered yet?{' '}
          <Link href="/auth/sign-up" className="link link-primary font-medium hover:text-primary-focus transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}
