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
        <BidForm auction={auction} />
      </Modal>
    );
  } else {
    return null;
  }
}
