import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';
import { Item, User } from '@/types';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import PublishSwitch from './publish-switch';

async function findUniqueWithInclude<T>(
  where: object,
  include: object
): Promise<T | null> {
  const response = await prisma.user.findUnique({
    where,
    include,
  });

  return response as T | null;
}

// Can be improved. Experimenting Next.js 13 communicate to database inside server component.
export default async function MyItems() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/items`);
  }

  if (session?.user) {
    const user: User | null = await findUniqueWithInclude<User>(
      { id: parseInt(session?.user?.id) },
      {
        items: {
          where: { state: { in: 'DRAFT' } },
        },
      }
    );

    return (
      <main className='min-h-screen p-24'>
        <h1 className='mb-4 text-lg text-orange-300'>My Items</h1>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          {user?.items?.map((item: Item) => (
            <Card className='w-[350px]' key={item.id}>
              <CardHeader></CardHeader>
              <CardContent>
                <form>
                  <div className='grid w-full items-center gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='item-name'>Name</Label>
                      <Input id='item-name' value={item.name} disabled />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='start-price'>Start Price</Label>
                      <Input
                        id='start-price'
                        value={item.startingPrice}
                        disabled
                      />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='time-window'>Time Window</Label>
                      <Input
                        id='time-window'
                        value={item.timeWindow}
                        disabled
                      />
                      <span className='text-sm text-gray-500'>
                        The time window is measured in hours. Minimum value: 1.
                      </span>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className=''>
                <PublishSwitch item={item} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    );
  } else {
    return null;
  }
}
