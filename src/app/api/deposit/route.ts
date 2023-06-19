import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
