import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { RegisterForm } from './RegisterForm';

export default async function RegisterPage() {
  return (
    <main className='w-full p-10 md:grid  md:place-items-center'>
      <div className='md:w-6/12 lg:w-5/12'>
        <h1 className='mb-5 text-3xl font-medium'>Register</h1>
        <RegisterForm />
        <div className='grid place-items-center'>
          <Button variant='link'>
            <Link href='/login'>Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
