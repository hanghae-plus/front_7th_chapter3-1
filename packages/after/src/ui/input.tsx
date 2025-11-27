import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/libs/utils';

const inputVariants = cva(
	'w-full px-3 py-2 text-base font-sans text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-[3px] bg-white dark:bg-gray-700 box-border transition-colors focus:outline-none focus:border-primary-500',
	{
		variants: {
			error: {
				true: 'border-danger-500 focus:border-danger-500',
				false: '',
			},
			width: {
				small: 'w-[200px]',
				medium: 'w-[300px]',
				large: 'w-[400px]',
				full: 'w-full',
			},
		},
		defaultVariants: {
			error: false,
			width: 'full',
		},
	},
);

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'width'>,
		Omit<VariantProps<typeof inputVariants>, 'error'> {
	label?: string;
	error?: string;
	helpText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, error, width, label, helpText, required, name, ...props }, ref) => {
		const helperClasses = cn(
			'text-gray-600 dark:text-gray-400 text-sm font-sans mt-1',
			error && 'text-danger-500',
		);

		return (
			<div className="mb-4">
				{label && (
					<label
						htmlFor={name}
						className="block mb-2 text-gray-800 dark:text-gray-200 text-sm font-bold font-sans"
					>
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}

				<input
					id={name}
					name={name}
					ref={ref}
					className={cn(inputVariants({ error: !!error, width }), className)}
					required={required}
					aria-invalid={!!error}
					aria-describedby={error ? `${name}-error` : helpText ? `${name}-description` : undefined}
					{...props}
				/>

				{error && (
					<span id={`${name}-error`} className={helperClasses}>
						{error}
					</span>
				)}
				{helpText && !error && (
					<span id={`${name}-description`} className="text-gray-600 dark:text-gray-400 text-sm font-sans mt-1">
						{helpText}
					</span>
				)}
			</div>
		);
	},
);

Input.displayName = 'Input';
