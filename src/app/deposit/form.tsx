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

const formSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .refine((value) => parseFloat(value) > 0, {
      message: 'Amount must be a number greater than 0',
    }),
});

export function DepositForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await fetch('/api/deposit', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
        return;
      }

      toast({
        title: 'Success!',
        description: 'Deposit amount successful',
        variant: 'success',
      });

      setLoading(false);
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
          Deposit
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem className='mb-3'>
                <FormLabel>Amount</FormLabel>
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

          <div className='flex justify-end gap-2'>
            {loading ? (
              <Button type='submit' disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button data-testid='deposit-button' type='submit'>
                Deposit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
