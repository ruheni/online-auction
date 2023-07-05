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
    <div className='flex h-screen flex-col items-center  justify-center '>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-md'>
        <DepositForm />
      </div>
    </div>
  );
}
