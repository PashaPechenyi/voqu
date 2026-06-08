import { useCallback, useState } from 'react';
import { getLevelsReq } from '@/features/levels/helpers/getLevelsReq.helper';
import { Level } from '@/features/levels/types/level.type';

export const useLevelsList = () => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);

  // RENAME: fetchLevels -> getLevels -> getLevelsList - no 'fetch' in names; matches the levelsList state it loads
  const getLevelsList = useCallback(async () => {
    const responseData = await getLevelsReq();
    setLevelsList(responseData.items);
  }, []);

  return { levelsList, getLevelsList };
};
