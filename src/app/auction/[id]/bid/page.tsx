import prisma from '@/lib/prisma';

import { BidForm } from './form';

interface pageProps {
  params: { id: string };
}

export default async function BidPage({ params: { id } }: pageProps) {
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
