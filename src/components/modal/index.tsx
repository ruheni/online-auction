'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current || e.target === wrapperRef.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onDismiss]);

  return (
    <>
      <div
        ref={overlayRef}
        className='fixed bottom-0 left-0 right-0 top-0 z-10 mx-auto bg-black/60'
        onClick={onClick}
      >
        <div
          ref={wrapperRef}
          className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 sm:w-10/12 md:w-8/12 
        lg:w-1/2 xl:w-1/2'
        >
          {children}
        </div>
      </div>
    </>
  );
}
