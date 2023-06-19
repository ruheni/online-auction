import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { itemId } = (await req.json()) as {
      itemId: string;
    };

    if (session?.user) {
      const updatedItem = await prisma.item.update({
        where: { id: parseInt(itemId) },
        data: {
          state: 'PUBLISHED',
          publishedAt: new Date(),
          auctions: {
            create: {},
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
