import getLevels from '@/features/levels/helpers/getLevels';
import { Level } from '@/features/levels/types/level/level.type';
import { useState } from 'react';
const useGetLevelsList = () => {
  const [levelsData, setLevelsData] = useState<Level[]>([]);
  const fetchLevels = async () => {
    const levels = await getLevels();
    if (!levels) return;
    setLevelsData(levels);
  };

  return { levelsData, setLevelsData, fetchLevels };
};

export default useGetLevelsList;
