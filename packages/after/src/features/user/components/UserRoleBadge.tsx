import Badge, { badgeVariants } from '@/ui/badge';
import type { UserRole } from '@/features/user/types/user';
import type { VariantProps } from 'class-variance-authority';

const UserRoleBadge = ({ userRole }: { userRole: UserRole }) => {
	const getBadgeProps = (): {
		type: VariantProps<typeof badgeVariants>['variant'];
		label: string;
	} => {
		switch (userRole) {
			case 'admin':
				return { type: 'danger', label: '관리자' };
			case 'moderator':
				return { type: 'warning', label: '운영자' };
			case 'user':
				return { type: 'primary', label: '사용자' };
			default:
				return { type: 'secondary', label: '게스트' };
		}
	};

	const { type, label } = getBadgeProps();

	return <Badge variant={type}>{label}</Badge>;
};

export default UserRoleBadge;
