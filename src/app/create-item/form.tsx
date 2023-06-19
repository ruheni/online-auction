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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'name must be at least 5 characters.',
  }),
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .refine((value) => parseFloat(value) > 0, {
      message: 'Amount must be a number greater than 0',
    }),
  time: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .refine((value) => parseFloat(value) >= 1, {
      message: 'Amount must be a number greater than 1',
    }),
});

export function CreateItemForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      time: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await fetch('/api/item', {
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
        description: 'Create item successful',
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
          Create Item
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='mb-3'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='shadcn'
                    {...field}
                    data-testid='name-input'
                    type='text'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='mb-3'>
                <FormLabel>Start Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0'
                    {...field}
                    data-testid='price-input'
                    type='text'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem className='mb-3'>
                <FormLabel>Time Window</FormLabel>
                <FormControl>
                  <Input
                    placeholder='0'
                    {...field}
                    data-testid='time-input'
                    type='text'
                  />
                </FormControl>
                <FormDescription>
                  The time window is using hour as a time unit. Minimum is 1
                </FormDescription>
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
              <Button data-testid='create-button' type='submit'>
                Create
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
