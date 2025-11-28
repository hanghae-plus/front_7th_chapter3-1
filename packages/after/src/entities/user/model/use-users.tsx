import { useSyncExternalStore } from 'react';
import type { User } from './user-type';
import { userStore } from './user-store';

interface UsersContextValue {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useUsers = (): UsersContextValue => {
  const state = useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
    userStore.getServerSnapshot
  );

  return {
    users: state.users,
    isLoading: state.isLoading,
    error: state.error,
    refetch: userStore.refetch,
  };
};
