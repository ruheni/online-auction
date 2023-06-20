import prisma from '@/lib/prisma';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { BidForm } from './form';

interface pageProps {
  params: { id: string };
}

export default async function BidPage({ params: { id } }: pageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/auction/${id}/bid`);
  }

  const auction = await prisma.auction.findUnique({
    where: { id: JSON.parse(id) },
    include: {
      item: true,
    },
  });

  return (
    <main className='w-full p-10 md:grid  md:place-items-center'>
      <div className='md:w-6/12 lg:w-5/12'>
        <BidForm auction={auction} />
      </div>
    </main>
  );
}
