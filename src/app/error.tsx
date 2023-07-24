'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

function getStatusFromMessage(message: string): number | undefined {
  try {
    const parsedMessage = JSON.parse(message);
    return parsedMessage.status;
  } catch (error) {
    return undefined;
  }
}

function ErrorMessage({ error }: { error: ErrorProps['error'] }) {
  const status = getStatusFromMessage(error.message);
  return (
    <div className='p-8 text-center'>
      <h2 className='mb-4 text-2xl font-bold'>
        {status === 401
          ? JSON.parse(error.message).text
          : 'Something went wrong'}
      </h2>
    </div>
  );
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center'>
      <ErrorMessage error={error} />

      {getStatusFromMessage(error.message) === 401 && (
        <div className='mt-4 space-x-4'>
          <Button variant='link'>
            <Link data-cy='sign-in-link' href='/login'>
              Login
            </Link>
          </Button>

          <Button variant='link'>
            <Link data-cy='sign-up-link' href='/register'>
              Sign Up
            </Link>
          </Button>
        </div>
      )}

      {reset && (
        <Button variant='link' onClick={() => reset()} className='mt-4'>
          Try again
        </Button>
      )}
    </div>
  );
}
