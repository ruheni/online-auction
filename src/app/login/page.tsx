import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { LoginForm } from './form';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className='flex h-screen flex-col items-center  justify-center '>
      <h1
        className={`mb-2 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-4xl font-bold text-transparent`}
      >
        Sign In
      </h1>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-md'>
        <LoginForm />
      </div>
    </div>
  );
}
