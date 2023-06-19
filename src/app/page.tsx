import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className='flex min-h-screen flex-col items-center  p-24'>
      <h1 className='text-lg text-orange-300'>HomePage</h1>
      <Link href='/deposit' data-testid='deposit-modal-button'>
        Deposit
      </Link>
      <h2>{session?.user?.name}</h2>
    </main>
  );
}
