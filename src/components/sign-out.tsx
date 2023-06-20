'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

function SignOutButton() {
  return (
    <Link href='' onClick={() => signOut({ callbackUrl: '/login' })}>
      Logout
    </Link>
  );
}

export default SignOutButton;
