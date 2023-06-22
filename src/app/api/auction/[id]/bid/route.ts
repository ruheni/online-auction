import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { isIntervalPastThreshold } from '@/lib/utils';
import { Item } from '@prisma/client';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { price, id, item } = (await req.json()) as {
      price: string;
      id: number;
      item: Item;
    };

    if (session?.user) {
      //TODO: verify if the user has enough deposites to afford the bid.

      // latest bid by auction
      const latestBid = await prisma.bid.findFirst({
        where: {
          auctionId: id,
        },
        orderBy: {
          createdAt: 'desc', // Order by createdAt field in descending order
        },
        take: 1, // Retrieve only the first record
      });

      // no bid yet
      if (!latestBid) {
        // make sure the bid price is higher than the starting price.
        if (parseFloat(price) <= item.startingPrice) {
          return new NextResponse(
            JSON.stringify({
              status: 'error',
              message:
                'Invalid bid price. Must be greater than the current bid price',
            }),
            { status: 400 }
          );
        }

        await prisma.bid.create({
          data: {
            auctionId: id,
            userId: parseInt(session?.user?.id),
            price: parseFloat(price),
          },
        });
      } else {
        // check to make sure price is greater than the price found in the latestBid
        if (parseFloat(price) <= latestBid.price) {
          return new NextResponse(
            JSON.stringify({
              status: 'error',
              message:
                'Invalid bid price. Must be greater than the current bid price',
            }),
            { status: 400 }
          );
        }

        const thresholdSeconds = 5; // 5 seconds could be fast considering there is some delay on creating a new bid item with validation.

        if (
          latestBid.userId === parseInt(session?.user?.id) &&
          isIntervalPastThreshold(latestBid.createdAt, thresholdSeconds)
        ) {
          // user last auction was more than 5 seconds ago.
          await prisma.bid.create({
            data: {
              auctionId: id,
              userId: parseInt(session?.user?.id),
              price: parseFloat(price),
            },
          });

          // update auction current price from the latest bid price
          await prisma.auction.update({
            where: {
              id: id,
            },
            data: {
              currentPrice: parseFloat(price),
            },
          });
        } else {
          // user last bid request was less than 5 seconds
          return new NextResponse(
            JSON.stringify({
              status: 'error',
              message: 'Wait for the 5 seconds interval',
            }),
            { status: 400 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        message: ' This is going to be the POST bid',
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
