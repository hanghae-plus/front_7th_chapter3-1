import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '@/components/composed/FormInput';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import FormSelect from '@/components/composed/FormSelect';
import { Alert } from '@/components/ui/alert';
import type { User } from '@/services/userService';

const userSchema = z.object({
	username: z
		.string()
		.min(3, { message: '사용자명은 3자 이상이어야 합니다' })
		.max(20, { message: '사용자명은 20자 이하여야 합니다' })
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: '영문, 숫자, 언더스코어만 사용 가능합니다',
		}),
	email: z.string().email({ message: '올바른 이메일 형식이 아닙니다' }),
	role: z.enum(['user', 'moderator', 'admin']),
	status: z.enum(['active', 'inactive', 'suspended']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserEditDialogContentProps {
	type: 'edit';
	onClose: () => void;
	onEdit: (data: UserFormData) => void;
	initialData?: User;
}

interface UserCreateDialogContentProps {
	type: 'create';
	onClose: () => void;
	onCreate: (data: UserFormData) => void;
}

const UserDialogContent = (
	props: UserEditDialogContentProps | UserCreateDialogContentProps
) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserFormData>({
		resolver: zodResolver(userSchema),
		mode: 'onChange',
		defaultValues: {
			username: '',
			email: '',
			role: 'user',
			status: 'active',
		},
	});

	useEffect(() => {
		if (props.type === 'edit') {
			const editProps = props as UserEditDialogContentProps;
			if (editProps.initialData) {
				reset({
					username: editProps.initialData.username ?? '',
					email: editProps.initialData.email ?? '',
					role: editProps.initialData.role ?? 'user',
					status: editProps.initialData.status ?? 'active',
				});
			}
		} else {
			reset({
				username: '',
				email: '',
			});
		}
	}, [
		props.type,
		props.type === 'edit'
			? (props as UserEditDialogContentProps).initialData
			: null,
		reset,
	]);

	const onSubmit = (data: UserFormData) => {
		if (props.type === 'edit') {
			props.onEdit(data);
		} else {
			props.onCreate(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid gap-4'>
				{props.type === 'edit' && props.initialData && (
					<Alert
						variant='info'
						title={`ID: ${props.initialData?.id} | 생성일: ${props.initialData?.createdAt}`}
					/>
				)}

				<Controller
					name='username'
					control={control}
					render={({ field }) => (
						<FormInput
							{...field}
							label='사용자명'
							placeholder='사용자명을 입력하세요'
							required
							width='full'
							messageData={
								errors.username
									? { type: 'error', message: errors.username.message || '' }
									: undefined
							}
						/>
					)}
				/>
				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<FormInput
							{...field}
							label='이메일'
							placeholder='이메일을 입력하세요'
							type='email'
							required
							width='full'
							messageData={
								errors.email
									? { type: 'error', message: errors.email.message || '' }
									: undefined
							}
						/>
					)}
				/>
				<div className='grid grid-cols-2 gap-4'>
					<Controller
						name='role'
						control={control}
						render={({ field }) => (
							<FormSelect
								{...field}
								label='역할'
								selectOptions={[
									{ value: 'user', label: '사용자' },
									{ value: 'moderator', label: '운영자' },
									{ value: 'admin', label: '관리자' },
								]}
							/>
						)}
					/>
					<Controller
						name='status'
						control={control}
						render={({ field }) => (
							<FormSelect
								{...field}
								label='상태'
								selectOptions={[
									{ value: 'active', label: '활성' },
									{ value: 'inactive', label: '비활성' },
									{ value: 'suspended', label: '정지' },
								]}
							/>
						)}
					/>
				</div>
			</div>

			<DialogFooter>
				<DialogClose asChild>
					<Button
						type='button'
						variant='secondary'
						size='md'
						onClick={props.onClose}
					>
						취소
					</Button>
				</DialogClose>

				{props.type === 'edit' ? (
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={!!errors.username || !!errors.email}
						type='submit'
						variant='primary'
						size='md'
					>
						수정 완료
					</Button>
				) : (
					<Button type='submit' variant='primary' size='md'>
						생성
					</Button>
				)}
			</DialogFooter>
		</form>
	);
};

export default UserDialogContent;
