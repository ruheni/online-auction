import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { DepositForm } from './form';

export default async function DepositMoneyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/deposit`);
  }

  return (
    <main className='w-full p-10 md:grid  md:place-items-center'>
      <div className='md:w-6/12 lg:w-5/12'>
        <DepositForm />
      </div>
    </main>
  );
}
