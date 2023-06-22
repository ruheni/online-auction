import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { authOptions } from '@/lib/auth';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login?callbackUrl=/');
  }

  // not a good idea of communicating to the db directly
  // because of unable to revalidate once there is a change in the modal.
  const auctionsItem = await prisma.auction.findMany({
    include: {
      item: true,
    },
  });

  // parse auctions item for table data
  const auctions = auctionsItem.map((auction) => {
    const { id: itemId, ...rest } = auction.item;

    return {
      ...auction,
      ...rest,
      itemId,
    };
  });

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <DataTable data={auctions} columns={columns} />
    </main>
  );
}

// Same Issue
// https://stackoverflow.com/questions/76395718/is-there-a-way-to-on-demand-revalidate-data-from-a-server-component-that-directl
