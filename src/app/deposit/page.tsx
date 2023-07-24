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
      <h1
        data-testid='deposit-page-title'
        className={`mb-12 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-4xl font-bold text-transparent`}
      >
        Deposit
      </h1>
      <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-md'>
        <DepositForm />
      </div>
    </div>
  );
}
