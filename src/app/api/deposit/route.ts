import prisma from '@/lib/prisma';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      const deposits = await prisma.deposit.findMany({
        where: {
          userId: parseInt(session?.user.id),
        },
      });

      return NextResponse.json({
        success: true,
        deposits,
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

    const { amount } = (await req.json()) as {
      amount: string;
    };

    if (session?.user) {
      const user = await prisma.user.update({
        where: { id: parseInt(session?.user?.id) },
        data: {
          deposits: {
            create: { amount: parseFloat(amount) },
          },
        },
        include: {
          deposits: {
            orderBy: {
              createdAt: 'desc', // Order by creation timestamp in descending order
            },
            take: 1, // Limit the result to one deposit
          },
        },
      });

      return NextResponse.json({
        user: { ...user },
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
