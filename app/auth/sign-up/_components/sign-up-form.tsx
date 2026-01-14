'use client';
 
import { useActionState, useState } from 'react';
import { ControlledInput } from '@/app/_components/input';
import Link from 'next/link';
import { signup } from '../actions';
import { SignupFormState } from '../definitions';
 
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
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ControlledInput 
          name="email"
          placeholder="Email" 
          value={formData.email} 
          onChange={(val) => handleChange('email', val)}
          error={state.errors?.email}
        />
        <ControlledInput 
          name="name"
          placeholder="Name" 
          value={formData.name} 
          onChange={(val) => handleChange('name', val)}
          error={state.errors?.name}
        />
        <ControlledInput 
          name="password"
          placeholder="Password" 
          type="password"
          value={formData.password} 
          onChange={(val) => handleChange('password', val)}
          error={state.errors?.password}
        />
        <ControlledInput 
          name="confirmPassword"
          placeholder="Confirm Password" 
          type="password"
          value={formData.confirmPassword} 
          onChange={(val) => handleChange('confirmPassword', val)}
          error={state.errors?.confirmPassword}
        />
      </div>
      
      {state.message && (
        <p className="text-sm text-center text-error">{state.message}</p>
      )}
 
      <div className="flex flex-col gap-4">
        <button
          className="btn btn-primary"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <span className="loading loading-spinner"></span> : 'Sign Up'}
        </button>
        <p className="text-center">Already have an account? <Link href="/auth/sign-in" className="link">Login here</Link></p>
      </div>
    </form>
  );
}
