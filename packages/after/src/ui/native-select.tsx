import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/features/shared/libs/utils';

const nativeSelectVariants = cva(
	'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 w-full min-w-0 appearance-none rounded-[3px] border bg-transparent px-3 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-gray-300',
	{
		variants: {
			size: {
				sm: 'h-[36px] py-1 text-xs',
				md: 'h-[42px] py-2 text-sm',
				lg: 'h-[48px] py-2 text-base',
			},
		},
		defaultVariants: {
			size: 'md',
		},
	},
);

interface NativeSelectProps
	extends Omit<React.ComponentProps<'select'>, 'size'>,
		VariantProps<typeof nativeSelectVariants> {}

function NativeSelect({ className, size, ...props }: NativeSelectProps) {
	return (
		<div
			className="group/native-select relative w-full has-[select:disabled]:opacity-50"
			data-slot="native-select-wrapper"
		>
			<select
				data-slot="native-select"
				className={cn(nativeSelectVariants({ size }), className)}
				{...props}
			/>
			<ChevronDownIcon
				className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
				aria-hidden="true"
				data-slot="native-select-icon"
			/>
		</div>
	);
}

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
	return <option data-slot="native-select-option" {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
	return <optgroup data-slot="native-select-optgroup" className={cn(className)} {...props} />;
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption, nativeSelectVariants };
