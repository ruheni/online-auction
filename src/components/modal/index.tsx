'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onDismiss]);

  const onInteractOutside = () => {
    onDismiss();
    setOpen(false);
  };

  useEffect(() => {
    if (pathname) setOpen(true);

    return () => {
      setOpen(false);
    };
  }, [pathname]);

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60'>
        <div
          className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 
        lg:w-1/2 xl:w-1/2'
        >
          <Dialog>
            <DialogContent open={open} onInteractOutside={onInteractOutside}>
              <DialogHeader>{children}</DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
