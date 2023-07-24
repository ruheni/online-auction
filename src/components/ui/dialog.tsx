'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className='fixed inset-0 z-50 flex items-end justify-center md:items-center md:justify-center'>
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  open?: boolean;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, open, ...props }, ref) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  return (
    <AnimatePresence>
      {open ? (
        <DialogPortal forceMount>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogOverlay className='bg-black/50' />
          </motion.div>
          <DialogPrimitive.Content
            asChild
            ref={ref}
            {...props}
            className={cn(
              'fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg ',
              className
            )}
          >
            <motion.div
              initial={isMobile ? { y: '100%' } : { scale: 0 }}
              animate={isMobile ? { y: 0 } : { scale: 1 }}
              exit={isMobile ? { y: '100%' } : { scale: 0 }}
              transition={{ ease: 'linear', duration: 0.15 }}
              className={cn(
                'fixed z-50 mx-4 flex max-h-[80vh] w-full flex-col gap-4 overflow-y-auto rounded-t-xl bg-white p-6',
                'sm:mr-0 sm:max-h-none sm:max-w-lg sm:shadow-lg',
                className
              )}
            >
              {children}

              <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
                <X className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </DialogPrimitive.Close>
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPortal>
      ) : null}
    </AnimatePresence>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
