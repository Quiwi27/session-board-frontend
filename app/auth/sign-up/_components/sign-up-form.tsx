'use client';

import { useActionState, useState } from 'react';
import { ControlledInput } from '@/app/_components/input';
import Link from 'next/link';
import { signup, SignupFormState } from '../_actions/actions';
import { Spinner } from '@/app/_components/spinner';

const initialState: SignupFormState = {
  message: '',
  errors: {},
};

export function SignUpForm() {
  const [state, action, isPending] = useActionState(signup, initialState);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
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
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(val) => handleChange('name', val)}
          errorMessage={state.errors?.name?.[0]}
        />
        <ControlledInput
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={(val) => handleChange('password', val)}
          errorMessage={state.errors?.password?.[0]}
        />
        <ControlledInput
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(val) => handleChange('confirmPassword', val)}
          errorMessage={state.errors?.confirmPassword?.[0]}
        />
      </div>

      {state.message && (
        <div className="p-3 rounded-lg bg-error/10 text-error text-sm text-center font-medium">
          {state.message}
        </div>
      )}

      <div className="flex flex-col gap-6 mt-2">
        <button
          className="btn btn-primary w-full text-lg font-normal tracking-wide shadow-lg shadow-primary/20"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <Spinner /> : 'Sign Up'}
        </button>
        <p className="text-center text-base-content/70">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="link link-primary font-medium hover:text-primary-focus transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}
