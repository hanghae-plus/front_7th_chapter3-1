import { useState, useEffect } from 'react';
import { postService } from '../services/postService';
import type { Post, PostFormData, PostUpdateData } from '../types/post.types';

export const usePostManagement = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postService.getAll();
      setPosts(data);
    } catch (err: any) {
      setError(err.message || '데이터를 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async (postData: PostFormData): Promise<void> => {
    setError(null);
    try {
      await postService.create(postData);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || '생성에 실패했습니다');
      throw err;
    }
  };

  const updatePost = async (id: number, postData: PostUpdateData): Promise<void> => {
    setError(null);
    try {
      await postService.update(id, postData);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || '수정에 실패했습니다');
      throw err;
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    setError(null);
    try {
      await postService.delete(id);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || '삭제에 실패했습니다');
      throw err;
    }
  };

  const publishPost = async (id: number): Promise<void> => {
    setError(null);
    try {
      await postService.publish(id);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || '게시에 실패했습니다');
      throw err;
    }
  };

  const archivePost = async (id: number): Promise<void> => {
    setError(null);
    try {
      await postService.archive(id);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || '보관에 실패했습니다');
      throw err;
    }
  };

  const restorePost = async (id: number): Promise<void> => {
    setError(null);
    try {
      await postService.restore(id);
      await loadPosts();
    } catch (err: any) {
      setError(err.message || '복원에 실패했습니다');
      throw err;
    }
  };

  const getStats = () => {
    return {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      archived: posts.filter(p => p.status === 'archived').length,
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
    };
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    archivePost,
    restorePost,
    getStats,
    reload: loadPosts,
  };
};
