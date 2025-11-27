import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info, Check, AlertCircle, X } from 'lucide-react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current [&>button]:absolute [&>button]:right-4 [&>button]:top-4',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground border-alert-default',
				info: 'bg-card text-info border-info',
				success: 'bg-card text-success border-success',
				warning: 'bg-card text-warning border-warning',
				error:
					'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function AlertContainer({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot='alert'
			role='alert'
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='alert-title'
			className={cn(
				'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
				className
			)}
			{...props}
		/>
	);
}

const alertDescriptionVariants = cva(
	'col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
	{
		variants: {
			variant: {
				default: 'text-muted-foreground',
				info: 'text-info',
				success: 'text-success',
				warning: 'text-warning',
				error: 'text-destructive/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function AlertDescription({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> &
	VariantProps<typeof alertDescriptionVariants>) {
	return (
		<div
			data-slot='alert-description'
			className={cn(alertDescriptionVariants({ variant }), className)}
			{...props}
		/>
	);
}

function Alert({
	variant = 'default',
	title,
	children,
	onClose,
	showIcon = true,
}: {
	variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
	title?: string;
	children: React.ReactNode;
	onClose?: () => void;
	showIcon?: boolean;
}) {
	const alertIcon = (
		variant: 'info' | 'success' | 'warning' | 'error' | 'default'
	) => {
		switch (variant) {
			case 'info':
				return <Info />;
			case 'success':
				return <Check color='green' />;
			case 'warning':
				return <AlertCircle />;
			case 'error':
				return <X />;
			default:
				return <Info />;
		}
	};

	return (
		<AlertContainer variant={variant}>
			{showIcon && alertIcon(variant)}
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription variant={variant}>{children}</AlertDescription>
			{onClose && (
				<button
					onClick={onClose}
					className='rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
					aria-label='Close alert'
				>
					<X className='h-4 w-4' />
				</button>
			)}
		</AlertContainer>
	);
}

export default Alert;
export { Alert };
