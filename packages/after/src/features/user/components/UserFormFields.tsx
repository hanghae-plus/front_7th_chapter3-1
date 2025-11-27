import { useFormContext } from 'react-hook-form';
import { Input } from '@/ui/input';
import { FormSelect, type Option } from '@/features/shared/components/FormSelect';
import type { UserFormSchema } from '@/features/user/schemas';

const ROLE_OPTIONS: Option[] = [
	{ value: 'user', label: '사용자' },
	{ value: 'moderator', label: '운영자' },
	{ value: 'admin', label: '관리자' },
];

const STATUS_OPTIONS: Option[] = [
	{ value: 'active', label: '활성' },
	{ value: 'inactive', label: '비활성' },
	{ value: 'suspended', label: '정지' },
];

export const UserFormFields = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<UserFormSchema>();

	return (
		<div className="space-y-4">
			<Input
				{...register('username')}
				label="사용자명"
				placeholder="사용자명을 입력하세요"
				required
				width="full"
				error={errors.username?.message}
			/>
			<Input
				{...register('email')}
				label="이메일"
				placeholder="이메일을 입력하세요"
				type="email"
				required
				width="full"
				error={errors.email?.message}
			/>
			<div className="grid grid-cols-2 gap-4">
				<FormSelect
					{...register('role')}
					options={ROLE_OPTIONS}
					label="역할"
					size="md"
					error={errors.role?.message}
				/>
				<FormSelect
					{...register('status')}
					options={STATUS_OPTIONS}
					label="상태"
					size="md"
					error={errors.status?.message}
				/>
			</div>
		</div>
	);
};
