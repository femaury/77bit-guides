import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === 'primary'
            ? 'p-4 bg-gradient-to-t from-bg-primary to-bg-secondary border border-border-primary shadow-md rounded-lg backdrop-blur-sm'
            : 'bg-black/20 rounded-lg p-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-2', className)}
      {...props}
    />
  );
});

CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('p-2 pt-0', className)} {...props} />
  );
});

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center p-2 pt-0', className)}
      {...props}
    />
  );
});

CardFooter.displayName = 'CardFooter';

const CardTitle = React.forwardRef<
  HTMLHeadingElement, 
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-xl font-bold mb-2 text-yellow-500/90 drop-shadow', className)}
      {...props}
    />
  );
});

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement, 
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-gray-400', className)}
      {...props}
    />
  );
});

CardDescription.displayName = 'CardDescription';

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription }; 