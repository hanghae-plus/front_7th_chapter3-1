import * as React from 'react';
import { cn } from '@/features/shared/libs/utils';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	helpText?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	(
		{
			name,
			label,
			placeholder,
			required = false,
			disabled = false,
			error,
			helpText,
			rows = 4,
			className,
			...props
		},
		ref,
	) => {
		const textareaClasses = cn(
			'w-full min-h-24 py-4 px-3.5 text-base font-normal',
			'text-black/[0.87] dark:text-white/[0.87]',
			'border border-black/[0.23] dark:border-white/[0.23] rounded',
			'bg-white dark:bg-gray-700 box-border',
			'transition-[border-color] duration-200 ease-[cubic-bezier(0,0,0.2,1)]',
			'outline-none resize-y',
			'focus:border-[#1976d2] focus:border-2 focus:py-[15.5px] focus:px-[13px]',
			'disabled:bg-black/[0.12] dark:disabled:bg-white/[0.12]',
			error && 'border-[#d32f2f] dark:border-[#f44336]',
			className,
		);

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
						{required && <span className="text-[#d32f2f] dark:text-[#f44336] ml-1">*</span>}
					</label>
				)}

				<textarea
					id={name}
					name={name}
					ref={ref}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					rows={rows}
					className={textareaClasses}
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
					<span
						id={`${name}-description`}
						className="text-gray-600 dark:text-gray-400 text-sm font-sans mt-1"
					>
						{helpText}
					</span>
				)}
			</div>
		);
	},
);

FormTextarea.displayName = 'FormTextarea';
