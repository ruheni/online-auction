import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-lg text-orange-300'>HomePage</h1>
      <h2>{session?.user?.name}</h2>
    </main>
  );
}
