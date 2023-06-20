import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';
import { computeTimestamp } from '@/lib/utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const biddingOpenParam = searchParams.get('biddingOpen');

    let biddingOpen;

    if (biddingOpenParam !== null && biddingOpenParam !== undefined) {
      const parsedValue = JSON.parse(biddingOpenParam);
      biddingOpen = typeof parsedValue === 'boolean' ? parsedValue : undefined;
    } else {
      biddingOpen = undefined;
    }

    const session = await getServerSession(authOptions);

    if (session?.user) {
      const expiredAuctions = await prisma.auction.findMany({
        where: {
          ...(biddingOpen !== null && biddingOpen !== undefined
            ? { biddingOpen }
            : {}),
        },
        include: {
          item: true,
        },
      });

      return NextResponse.json({
        success: true,
        ...expiredAuctions,
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { itemId, timeWindow } = (await req.json()) as {
      itemId: string;
      timeWindow: number;
    };

    if (session?.user) {
      const updatedItem = await prisma.item.update({
        where: { id: parseInt(itemId) },
        data: {
          state: 'PUBLISHED',
          publishedAt: new Date(),
          auctions: {
            create: {
              endTime: computeTimestamp(timeWindow).toISO(),
            },
          },
        },
        include: {
          auctions: true, // Include the created auction in the response
        },
      });

      return NextResponse.json({ ...updatedItem });
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
