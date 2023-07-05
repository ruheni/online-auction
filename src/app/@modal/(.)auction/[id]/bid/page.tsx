import { BidForm } from '@/app/auction/[id]/bid/form';
import Modal from '@/components/modal';

import prisma from '@/lib/prisma';

interface pageProps {
  params: { id: string };
}

export default async function BidModal({ params: { id } }: pageProps) {
  const auction = await prisma.auction.findUnique({
    where: { id: JSON.parse(id) },
    include: {
      item: true,
    },
  });

  if (auction) {
    return (
      <Modal>
        <div className='flex h-screen flex-col items-center  justify-center '>
          <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-md'>
            <BidForm auction={auction} />
          </div>
        </div>
      </Modal>
    );
  } else {
    return null;
  }
}
