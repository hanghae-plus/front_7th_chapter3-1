import { useState, useCallback } from 'react';
import { postService } from '@/features/post/services/postService';
import type { Post, PostFormData } from '@/features/post/types/post';

interface UsePostManagementReturn {
	posts: Post[];
	isLoading: boolean;
	error: string | null;
	loadPosts: () => Promise<void>;
	createPost: (postData: PostFormData) => Promise<void>;
	updatePost: (id: number, postData: Partial<PostFormData>) => Promise<void>;
	deletePost: (id: number) => Promise<void>;
	publishPost: (id: number) => Promise<void>;
	archivePost: (id: number) => Promise<void>;
	restorePost: (id: number) => Promise<void>;
}

export const usePostManagement = (): UsePostManagementReturn => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadPosts = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await postService.getAll();
			setPosts(data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('게시글 데이터를 불러오는데 실패했습니다');
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const createPost = useCallback(
		async (postData: PostFormData) => {
			setError(null);
			try {
				await postService.create(postData);
				await loadPosts();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('게시글 생성에 실패했습니다');
				}
				throw err;
			}
		},
		[loadPosts],
	);

	const updatePost = useCallback(
		async (id: number, postData: Partial<PostFormData>) => {
			setError(null);
			try {
				await postService.update(id, postData);
				await loadPosts();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('게시글 수정에 실패했습니다');
				}
				throw err;
			}
		},
		[loadPosts],
	);

	const deletePost = useCallback(
		async (id: number) => {
			setError(null);
			try {
				await postService.delete(id);
				await loadPosts();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('게시글 삭제에 실패했습니다');
				}
				throw err;
			}
		},
		[loadPosts],
	);

	const publishPost = useCallback(
		async (id: number) => {
			setError(null);
			try {
				await postService.publish(id);
				await loadPosts();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('게시글 게시에 실패했습니다');
				}
				throw err;
			}
		},
		[loadPosts],
	);

	const archivePost = useCallback(
		async (id: number) => {
			setError(null);
			try {
				await postService.archive(id);
				await loadPosts();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('게시글 보관에 실패했습니다');
				}
				throw err;
			}
		},
		[loadPosts],
	);

	const restorePost = useCallback(
		async (id: number) => {
			setError(null);
			try {
				await postService.restore(id);
				await loadPosts();
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('게시글 복원에 실패했습니다');
				}
				throw err;
			}
		},
		[loadPosts],
	);

	return {
		posts,
		isLoading,
		error,
		loadPosts,
		createPost,
		updatePost,
		deletePost,
		publishPost,
		archivePost,
		restorePost,
	};
};
