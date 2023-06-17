import prisma from '@/lib/prisma';
import { timeAgo } from '@/lib/utils';
import { User } from '@/types';

export default async function Home() {
  const users = await prisma.users.findMany();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {users.map((user: User) => (
        <div key={user.name} className='flex items-center justify-between py-3'>
          <div className='flex items-center space-x-4'>
            <div className='space-y-1'>
              <p className='font-medium leading-none'>{user.name}</p>
              <p className='text-sm text-gray-500'>{user.email}</p>
            </div>
          </div>
          <p className='text-sm text-gray-500'>{timeAgo(user.createdAt)}</p>
        </div>
      ))}
    </main>
  );
}
