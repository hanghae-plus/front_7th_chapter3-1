import { NativeSelect, NativeSelectOption, nativeSelectVariants } from '@/ui/native-select';
import type { VariantProps } from 'class-variance-authority';
import React from 'react';

export interface Option {
	value: string;
	label: string;
}

export interface FormSelectProps extends VariantProps<typeof nativeSelectVariants> {
	name: string;
	options: Option[];
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	error?: string;
	helpText?: string;
	className?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
	(
		{
			name,
			options,
			label,
			placeholder = 'Select an option...',
			required = false,
			disabled = false,
			error,
			helpText,
			size = 'md',
			className,
			...props
		},
		ref,
	) => {
		return (
			<div>
				{label && (
					<label
						htmlFor={name}
						className="block mb-2 text-gray-800 dark:text-gray-200 text-sm font-bold font-sans"
					>
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}

				<NativeSelect
					ref={ref}
					id={name}
					name={name}
					required={required}
					disabled={disabled}
					aria-invalid={!!error}
					aria-describedby={error ? `${name}-error` : helpText ? `${name}-description` : undefined}
					size={size}
					className={className}
					{...props}
				>
					<NativeSelectOption value="" disabled>
						{placeholder}
					</NativeSelectOption>
					{options.map((option) => (
						<NativeSelectOption key={option.value} value={option.value}>
							{option.label}
						</NativeSelectOption>
					))}
				</NativeSelect>

				{error && (
					<p id={`${name}-error`} className="text-sm text-destructive">
						{error}
					</p>
				)}
				{helpText && !error && (
					<p id={`${name}-description`} className="text-sm text-muted-foreground">
						{helpText}
					</p>
				)}
			</div>
		);
	},
);

FormSelect.displayName = 'FormSelect';
