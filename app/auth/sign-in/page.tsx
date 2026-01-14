import { SignInForm } from './_components/sign-in-form';

export default function SignInPage() {
  return (
    <div className="w-full max-w-md flex items-center justify-center p-4">
       <div className="w-full bg-base-100 rounded-3xl p-8 md:p-12 shadow-2xl border border-base-200">
        <div className="flex flex-col items-center justify-center mb-10 text-center space-y-2">
          <h1 className="font-bold text-3xl md:text-4xl tracking-tight text-base-content">
            Welcome Back
          </h1>
          <p className="text-base-content/60 text-lg">
            Sign in to your account
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
