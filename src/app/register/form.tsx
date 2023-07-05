'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
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
import Link from 'next/link';

interface PasswordVisibility {
  password: boolean;
  confirmPassword: boolean;
}

const formSchema = z
  .object({
    name: z.string().min(5, {
      message: 'Name must be a minimum of 5 characters.',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      )
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords do not match.',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    criteriaMode: 'all',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] =
    useState<PasswordVisibility>({
      password: false,
      confirmPassword: false,
    });

  const handleEyeClick = (fieldName: keyof PasswordVisibility) => {
    setIsPasswordVisible((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: '/',
      });

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        {error && (
          <p className='mb-6 rounded bg-red-300 py-4 text-center'>{error}</p>
        )}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
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
                <div className='relative'>
                  <Input
                    type={isPasswordVisible.password ? 'text' : 'password'}
                    placeholder='******'
                    {...field}
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                    <Eye
                      className={
                        form.formState.dirtyFields['password']
                          ? 'visible'
                          : 'hidden'
                      }
                      onClick={() => handleEyeClick('password')}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage showMultipleErrors />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='mb-3'>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='******'
                    type={
                      isPasswordVisible.confirmPassword ? 'text' : 'password'
                    }
                    {...field}
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                    <Eye
                      className={
                        form.formState.dirtyFields['confirmPassword']
                          ? 'visible'
                          : 'hidden'
                      }
                      onClick={() => handleEyeClick('confirmPassword')}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid place-items-center p-4'>
          {loading ? (
            <Button disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type='submit'>Submit</Button>
          )}

          <Button variant='link'>
            <Link data-cy='sign-in-link' href='/login'>
              Login
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
