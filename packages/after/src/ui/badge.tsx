import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/features/shared/libs/utils';

export const badgeVariants = cva(
	'inline-flex items-center justify-center font-bold leading-none whitespace-nowrap rounded-sm',
	{
		variants: {
			variant: {
				primary: 'bg-primary-500 text-white',
				secondary: 'bg-secondary-500 text-white',
				success: 'bg-success-500 text-white',
				danger: 'bg-danger-500 text-white',
				warning: 'bg-warning-500 text-white',
				info: 'bg-info-500 text-white',
			},
			size: {
				small: 'px-1 text-xs h-4',
				medium: 'px-2 text-xs h-5',
				large: 'px-2.5 text-sm h-6',
			},
			pill: {
				true: 'rounded-[10px]',
				false: 'rounded-sm',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'medium',
			pill: false,
		},
	},
);

const Badge = ({
	className,
	variant,
	size,
	pill,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant, size, pill }), className)}
			{...props}
		/>
	);
};

export default Badge;
