import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';

import prisma from '@/lib/prisma';

export default async function Home() {
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
      biddingOpen: auction.biddingOpen ? 'ongoing' : 'completed',
    };
  });

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <DataTable data={auctions} columns={columns} />
    </main>
  );
}
