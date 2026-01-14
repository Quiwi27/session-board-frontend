import { SignUpForm } from './_components/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md m-auto flex items-center justify-center p-4">
       <div className="w-full bg-base-100 rounded-3xl p-8 md:p-12 shadow-2xl border border-base-200">
        <div className="flex flex-col items-center justify-center mb-10 text-center space-y-2">
          <h1 className="font-bold text-3xl md:text-4xl tracking-tight text-base-content">
            Create Account
          </h1>
          <p className="text-base-content/60 text-lg">
            Join our community today
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
