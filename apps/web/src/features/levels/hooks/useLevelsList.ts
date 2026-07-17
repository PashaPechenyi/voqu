import { useState } from 'react';
import { Level } from '../types/level.type';
import { getLevelsReq } from '../helpers/getLevelsReq.helper';
import { useMutation } from '@/shared/api';

type UseLevelsListOptions = {
  onSuccess?: (levelsList: Level[]) => void;
  onError?: (error: Error) => void;
};

// TODO: onSuccess and onError are not used in the hook
export const useLevelsList = ({ onSuccess, onError }: UseLevelsListOptions = {}) => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);
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
