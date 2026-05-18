import { useCallback, useState } from 'react';
import { getLevelsReq } from '@/features/levels/helpers/getLevelsReq.helper';
import { Level } from '@/features/levels/types/level.type';

export const useLevelsList = () => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);

  const fetchLevels = useCallback(async () => {
    const responseData = await getLevelsReq();
    setLevelsList(responseData.items);
  }, []);

  return { levelsList, fetchLevels };
};
