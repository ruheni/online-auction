import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Balance from './deposit-balance';
import SignOutButton from './sign-out';

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className='flex items-center justify-between bg-gray-800 px-10 py-2 text-white'>
      <div className='flex items-center'>
        <span className='text-lg font-bold'>
          <Link href='/'>OaS</Link>
        </span>
      </div>
      <div className='flex items-center'>
        {session?.user && <Balance />}

        <span className=' ml-4 mr-2 text-sm'>{session?.user?.name}</span>

        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src='https://github.com/shadcn.png'
                  alt='@shadcn'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <Link href='/create-item'>Create New Item</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* 
                  DropdownMenuItem:
                  This component appears to be broken and is experiencing issues with Next.js 13 route interception. When used with a Link component, it causes multiple re-renders.  
                  ..
                  DropdownMenuItem > DropdownMenuLabel
              */}
              <DropdownMenuLabel>
                <Link href='/deposit'>Deposit</Link>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href='/items'>My Items</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default Header;
