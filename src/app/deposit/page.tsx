import { DepositForm } from './form';

export default async function DepositMoneyPage() {
  return (
    <main className='w-full p-10 md:grid  md:place-items-center'>
      <div className='md:w-6/12 lg:w-5/12'>
        <DepositForm />
      </div>
    </main>
  );
}
