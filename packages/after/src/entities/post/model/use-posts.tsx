import { useSyncExternalStore } from 'react';
import type { Post } from './post-type';
import { postStore } from './post-store';

interface PostsContextValue {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const usePosts = (): PostsContextValue => {
  const state = useSyncExternalStore(
    postStore.subscribe,
    postStore.getSnapshot,
    postStore.getServerSnapshot
  );

  return {
    posts: state.posts,
    isLoading: state.isLoading,
    error: state.error,
    refetch: postStore.refetch,
  };
};
