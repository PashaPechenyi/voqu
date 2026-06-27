import { useCallback, useState } from 'react';
import { Level } from '../types/level.type';
import { getLevelsReq } from '../helpers/getLevelsReq.helper';
import { useMutation } from '@/shared/api';

type UseLevelsListOptions = {
  onSuccess?: (levelsList: Level[]) => void;
  onError?: (error: Error) => void;
};

export const useLevelsList = ({}: UseLevelsListOptions = {}) => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  // const fetchLevels = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const result = await getLevelsReq();
  //     setLevelsList(result.items);
  //     onSuccess?.(result.items);
  //   } catch (err) {
  //     const e = err instanceof Error ? err : new Error('Unknown error');
  //     setError(e);
  //     onError?.(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [onSuccess, onError]);
  const {
    isLoading,
    error,
    mutate: fetchLevels,
  } = useMutation({
    mutationFn: getLevelsReq,
    onSuccess: (result) => {
      setLevelsList(result.items);
    },
  });
  return { levelsList, fetchLevels, isLoading, error };
};
