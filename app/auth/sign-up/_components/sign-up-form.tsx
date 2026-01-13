import { ControlledInput } from '@/app/_components/input';


export function SignUpForm() {
  return (
    <form className="flex flex-col gap-4">
      <ControlledInput placeholder="Email" value="" />
      <ControlledInput placeholder="Password" value="" />
      <ControlledInput placeholder="Confirm Password" value="" />
      <button className="btn">Sign Up</button>
    </form>
  );
}
