import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/libs/utils';

const alertVariants = cva(
	'py-2 px-3 mb-4 rounded-[3px] border font-sans flex gap-2 items-start',
	{
		variants: {
			variant: {
				info: 'bg-[#e3f2fd] dark:bg-[#1e3a5f] border-[#90caf9] dark:border-[#4a90e2] text-[#0d47a1] dark:text-[#90caf9]',
				success:
					'bg-[#e8f5e9] dark:bg-[#1e4620] border-[#81c784] dark:border-[#4caf50] text-[#1b5e20] dark:text-[#81c784]',
				warning:
					'bg-[#fff3e0] dark:bg-[#4a3c1e] border-[#ffb74d] dark:border-[#ff9800] text-[#e65100] dark:text-[#ffb74d]',
				error: 'bg-[#ffebee] dark:bg-[#4a1e1e] border-[#e57373] dark:border-[#f44336] text-[#b71c1c] dark:text-[#e57373]',
				default:
					'bg-[#f5f5f5] dark:bg-gray-800 border-[#bdbdbd] dark:border-gray-600 text-[#424242] dark:text-gray-300',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

interface AlertProps extends VariantProps<typeof alertVariants> {
	children: React.ReactNode;
	title?: string;
	onClose?: () => void;
	showIcon?: boolean;
}

export const Alert = ({ children, variant = 'default', title, onClose, showIcon = true }: AlertProps) => {
	const getIcon = () => {
		switch (variant) {
			case 'info':
				return 'ℹ️';
			case 'success':
				return '✓';
			case 'warning':
				return '⚠️';
			case 'error':
				return '✕';
			default:
				return '•';
		}
	};

	return (
		<div className={cn(alertVariants({ variant }))}>
			{showIcon && <div className="text-xl shrink-0">{getIcon()}</div>}
			<div className="flex-1">
				{title && <div className="font-bold mb-1 text-[15px]">{title}</div>}
				<div className="text-sm leading-relaxed">{children}</div>
			</div>
			{onClose && (
				<button
					onClick={onClose}
					className="bg-transparent border-0 cursor-pointer text-xl px-1 py-0 ml-auto shrink-0 hover:opacity-70"
				>
					×
				</button>
			)}
		</div>
	);
};
