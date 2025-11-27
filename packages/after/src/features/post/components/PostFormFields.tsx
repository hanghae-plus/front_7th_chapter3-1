import { useFormContext } from 'react-hook-form';
import { FormTextarea } from '@/features/shared/components/FormTextarea';
import { Input } from '@/ui/input';
import { FormSelect, type Option } from '@/features/shared/components/FormSelect';
import type { PostFormSchema } from '@/features/post/schemas';

const CATEGORY_OPTIONS: Option[] = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'accessibility', label: 'Accessibility' },
];

export const PostFormFields = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<PostFormSchema>();

	return (
		<div className="space-y-4">
			<Input
				{...register('title')}
				label="제목"
				placeholder="게시글 제목을 입력하세요"
				required
				width="full"
				error={errors.title?.message}
			/>
			<div className="grid grid-cols-2 gap-4">
				<Input
					{...register('author')}
					label="작성자"
					placeholder="작성자명"
					required
					width="full"
					error={errors.author?.message}
				/>
				<FormSelect
					{...register('category')}
					options={CATEGORY_OPTIONS}
					label="카테고리"
					placeholder="카테고리 선택"
					size="md"
					error={errors.category?.message}
				/>
			</div>
			<FormTextarea
				{...register('content')}
				label="내용"
				placeholder="게시글 내용을 입력하세요"
				rows={6}
				error={errors.content?.message}
			/>
		</div>
	);
};
