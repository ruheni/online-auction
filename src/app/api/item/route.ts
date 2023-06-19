import prisma from '@/lib/prisma';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { name, price, time } = (await req.json()) as {
      name: string;
      price: string;
      time: string;
    };

    if (session?.user) {
      const user = await prisma.user.update({
        where: { id: parseInt(session?.user?.id) },
        data: {
          items: {
            create: {
              timeWindow: parseFloat(time) * 3600,
              startingPrice: parseFloat(price),
              name: name,
            },
          },
        },
      });

      return NextResponse.json({
        user: {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        },
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
