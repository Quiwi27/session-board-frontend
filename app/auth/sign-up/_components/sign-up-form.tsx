import { ControlledInput } from '@/app/_components/input';
import Link from 'next/link';

export function SignUpForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ControlledInput placeholder="Email" value="" />
        <ControlledInput placeholder="Password" value="" />
        <ControlledInput placeholder="Confirm Password" value="" />
      </div>

      <div className="flex flex-col gap-4">
        <button className="btn">Sign Up</button>
        <p className="text-center">Already have an account? <Link href="sign-in/">Login here</Link></p>
      </div>
    </form>
  );
}
