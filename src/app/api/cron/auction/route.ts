import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      // Update auctions that have already exceeded the time window
      await prisma.auction.updateMany({
        where: {
          OR: [
            {
              endTime: {
                lte: new Date(),
              },
            },
            {
              endTime: null,
            },
          ],
        },
        data: {
          biddingOpen: false,
        },
      });

      // find item related to the expired auctions
      const expiredAuctions = await prisma.auction.findMany({
        where: {
          OR: [
            {
              endTime: {
                lte: new Date(),
              },
            },
            {
              endTime: null,
            },
          ],
        },
      });

      // Update the state of the item to DRAFT so that it can be auctioned again
      const expiredAuctionsIncludingItems = await prisma.item.updateMany({
        where: {
          id: { in: expiredAuctions.map((auction) => auction.itemId) },
        },
        data: {
          state: 'DRAFT',
        },
      });

      return NextResponse.json({
        success: true,
        ...expiredAuctionsIncludingItems,
      });
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
