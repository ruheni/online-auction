'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Auction } from '@/types';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .refine((value) => parseFloat(value) > 0, {
      message: 'Amount must be a number greater than 0',
    }),
});

interface formProps<T> {
  auction: Auction | T;
}

export function BidForm<T>({ auction }: formProps<T>) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const item = (auction as Auction).item; // Type assertion
  const auctionId = (auction as Auction).id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await fetch(`/api/auction/${auctionId}/bid`, {
        method: 'POST',
        body: JSON.stringify({ ...auction, ...values }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res?.status === 400) {
        const error = await res.text();
        toast({
          variant: 'destructive',
          title: 'Uh oh! Bad Request',
          description: JSON.parse(error)?.message,
        });

        setLoading(false);
        return;
      }

      setLoading(false);

      toast({
        title: 'Success!',
        description: 'Bid amount successful',
        variant: 'success',
      });

      router.refresh();
    } catch (error) {
      setLoading(false);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }

    form.reset();
  }

  return (
    <div className='rounded-sm bg-white p-10' data-testid='deposit-form'>
      <Form {...form}>
        <h1
          className='mb-5 text-3xl font-medium'
          data-testid='deposit-page-title'
        >
          {item && item.name}
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='mb-3'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0'
                    {...field}
                    data-testid='amount-input'
                    type='text'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* if user current balance is not enough > show the link to deposit modal or page? */}

          <div className='flex justify-end gap-2'>
            {loading ? (
              <Button type='submit' disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button data-testid='bid-button' type='submit'>
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
