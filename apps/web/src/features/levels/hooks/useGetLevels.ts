import { useCallback, useState } from 'react';
import getLevels from '@/features/levels/helpers/getLevels';
import { Level } from '@/features/levels/types/level.type';

const useGetLevels = () => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);

  const fetchLevels = useCallback(async () => {
    const levels = await getLevels();
    if (!levels) return;
    setLevelsList(levels);
  }, []);

  return { levelsList, fetchLevels };
};

export default useGetLevels;
