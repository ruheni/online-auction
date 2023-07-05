'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm() {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: searchParams.get('callbackUrl') ?? '/',
      });
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='example@gmail.com'
                  {...field}
                  data-testid='email-input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='******'
                  {...field}
                  data-testid='password-input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid place-items-center p-4'>
          {loading ? (
            <Button type='submit' disabled data-testid='login-button'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button
              data-testid='login-button'
              type='submit'
              disabled={!form.formState.isValid}
            >
              Login
            </Button>
          )}

          <Button variant='link'>
            <Link data-cy='sign-up-link' href='/register'>
              Sign Up
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
