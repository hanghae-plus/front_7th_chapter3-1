import Badge, { badgeVariants } from '@/ui/badge';
import type { Category } from '@/features/post/types/post';
import type { VariantProps } from 'class-variance-authority';

const CategoryBadge = ({ category }: { category: Category }) => {
	const getBadgeProps = (): {
		type: VariantProps<typeof badgeVariants>['variant'];
		label: string;
	} => {
		switch (category) {
			case 'development':
				return { type: 'primary', label: 'development' };
			case 'design':
				return { type: 'info', label: 'design' };
			default:
				return { type: 'danger', label: 'accessibility' };
		}
	};

	const { type, label } = getBadgeProps();

	return (
		<Badge variant={type} pill>
			{label}
		</Badge>
	);
};

export default CategoryBadge;
