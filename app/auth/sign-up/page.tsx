import { ControlledInput } from '@/app/_components/input';


export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="bg-neutral w-full max-w-2xl">
        <div className='flex flex-col gap-2'>
          <input type="text" placeholder="Type here" className="input w-full" />
          <input type="text" placeholder="Type here" className="input w-full" />
          <input type="text" placeholder="Type here" className="input w-full" />
        </div>
      </div>
    </main>
  );
}
