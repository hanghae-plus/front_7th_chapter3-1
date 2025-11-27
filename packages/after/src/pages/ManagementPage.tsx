import { useState } from 'react';

import Button from '@/ui/button';
import PostManagement from '@/features/post/components/PostManagement';
import UserManagement from '@/features/user/components/UserManagement';
import Text from '@/features/shared/components/Text';
import type { EntityType } from '@/features/shared/types/common';

const ManagementPage = () => {
	const [entityType, setEntityType] = useState<EntityType>('post');

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="max-w-[1200px] mx-auto p-5">
				<div className="mb-5">
					<Text textType="heading1" className="text-gray-800 dark:text-gray-100">
						관리 시스템
					</Text>
					<Text textType="body2" className="text-gray-600 dark:text-gray-400">
						사용자와 게시글을 관리하세요
					</Text>
				</div>

				<div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2.5">
					<div className="mb-4 border-b border-gray-400 dark:border-gray-600 pb-1 flex gap-1">
						<Button
							onClick={() => setEntityType('post')}
							variant={entityType === 'post' ? 'primary' : 'secondary'}
							size="sm"
						>
							게시글
						</Button>
						<Button
							onClick={() => setEntityType('user')}
							variant={entityType === 'user' ? 'primary' : 'secondary'}
							size="sm"
						>
							사용자
						</Button>
					</div>

					{entityType === 'user' ? <UserManagement /> : <PostManagement />}
				</div>
			</div>
		</div>
	);
};

export default ManagementPage;
