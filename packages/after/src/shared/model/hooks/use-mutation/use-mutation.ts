import { useState, useCallback, useRef, useEffect } from 'react';

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (
    data: TData | null,
    error: Error | null,
    variables: TVariables,
  ) => void;
}

interface MutateOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (
    data: TData | null,
    error: Error | null,
    variables: TVariables,
  ) => void;
}

interface UseMutationResult<TData, TVariables> {
  data: TData | null;
  loading: boolean;
  error: Error | null;
  mutate: (
    variables: TVariables,
    mutateOptions?: MutateOptions<TData, TVariables>,
  ) => Promise<TData | null>;
  mutateAsync: (
    variables: TVariables,
    mutateOptions?: MutateOptions<TData, TVariables>,
  ) => Promise<TData>;
  reset: () => void;
}

export function useMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TVariables>,
): UseMutationResult<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // mutationFn과 콜백들을 ref로 저장하여 안정성 확보
  const mutationFnRef = useRef(mutationFn);
  const optionsRef = useRef(options);

  // 최신 함수들로 ref 업데이트
  useEffect(() => {
    mutationFnRef.current = mutationFn;
  }, [mutationFn]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const mutate = useCallback(
    async (
      variables: TVariables,
      mutateOptions?: MutateOptions<TData, TVariables>,
    ): Promise<TData | null> => {
      let resultData: TData | null = null;
      let errorData: Error | null = null;

      try {
        setLoading(true);
        setError(null);

        const result = await mutationFnRef.current(variables);
        resultData = result;
        setData(result);

        // mutate 호출 시점의 콜백이 우선순위가 높음
        const onSuccess =
          mutateOptions?.onSuccess ?? optionsRef.current?.onSuccess;
        if (onSuccess) {
          onSuccess(result, variables);
        }

        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An error occurred');
        errorData = error;
        setError(error);

        // mutate 호출 시점의 콜백이 우선순위가 높음
        const onError = mutateOptions?.onError ?? optionsRef.current?.onError;
        if (onError) {
          onError(error, variables);
        }

        return null;
      } finally {
        setLoading(false);

        const onSettled =
          mutateOptions?.onSettled ?? optionsRef.current?.onSettled;
        if (onSettled) {
          onSettled(resultData, errorData, variables);
        }
      }
    },
    [],
  );

  const mutateAsync = useCallback(
    async (
      variables: TVariables,
      mutateOptions?: MutateOptions<TData, TVariables>,
    ): Promise<TData> => {
      const result = await mutate(variables, mutateOptions);
      if (result === null) {
        throw new Error('Mutation failed');
      }
      return result;
    },
    [mutate],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    mutateAsync,
    reset,
  };
}
