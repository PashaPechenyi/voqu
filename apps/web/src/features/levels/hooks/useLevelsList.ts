import { useMutation } from './../../../shared/api/useMutation';
import { useState } from 'react';
import { getLevelsReq } from '@/features/levels/helpers/getLevelsReq.helper';
import { Level } from '@/features/levels/types/level.type';

export const useLevelsList = () => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);

  const { mutate: getLevelsList } = useMutation({
    mutationFn: getLevelsReq,
    onSuccess: (response) => {
      console.log(response);
      setLevelsList(response.items);
    },
    onError() {
      console.log('Something went wrong...');
    },
  });
  return { levelsList, getLevelsList };
};
