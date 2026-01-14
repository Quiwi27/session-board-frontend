import { SignUpForm } from './_components/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="flex flex-col w-full max-w-lg gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-semibold text-3xl">Create Your Account</h1>
        <p className="text-xl">Join our community by creating an account.</p>
      </div>
      <SignUpForm />
    </div>
  );
}
