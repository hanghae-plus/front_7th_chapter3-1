import Badge, { badgeVariants } from '@/ui/badge';
import type { PostStatus } from '@/features/post/types/post';
import type { VariantProps } from 'class-variance-authority';

const StatusBadge = ({ status }: { status: PostStatus }) => {
	const getBadgeProps = (): {
		type: VariantProps<typeof badgeVariants>['variant'];
		label: string;
	} => {
		switch (status) {
			case 'published':
				return { type: 'success', label: '게시됨' };
			case 'draft':
				return { type: 'warning', label: '임시저장' };
			case 'archived':
				return { type: 'secondary', label: '보관됨' };
			case 'pending':
				return { type: 'info', label: '대기중' };
			default:
				return { type: 'danger', label: '거부됨' };
		}
	};

	const { type, label } = getBadgeProps();

	return <Badge variant={type}>{label}</Badge>;
};

export default StatusBadge;
