import { cva, type VariantProps } from 'class-variance-authority';
import { Card, CardContent } from '@/ui/card';
import { cn } from '@/features/shared/libs/utils';

export const statsCardVariants = cva('', {
	variants: {
		color: {
			blue: 'bg-primary-50 dark:bg-primary-900 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300',
			green: 'bg-success-50 dark:bg-success-900 border-success-300 dark:border-success-700 text-success-700 dark:text-success-300',
			orange: 'bg-warning-50 dark:bg-warning-900 border-warning-300 dark:border-warning-700 text-warning-700 dark:text-warning-300',
			red: 'bg-danger-50 dark:bg-danger-900 border-danger-300 dark:border-danger-700 text-danger-700 dark:text-danger-300',
			gray: 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200',
		},
	},
	defaultVariants: {
		color: 'gray',
	},
});

interface DashboardCardProps extends VariantProps<typeof statsCardVariants> {
	label: string;
	value: number;
	className?: string;
}

const DashboardCard = ({ label, value, color, className }: DashboardCardProps) => {
	return (
		<Card
			className={cn('p-0 py-3 shadow-none rounded-sm', statsCardVariants({ color }), className)}
		>
			<CardContent className="px-3 py-0">
				<div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{label}</div>
				<div className="text-2xl font-bold">{value}</div>
			</CardContent>
		</Card>
	);
};

export default DashboardCard;
