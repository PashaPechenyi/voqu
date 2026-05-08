import { Level } from '@/features/levels/types/level.type';
import { useState } from 'react';

const useFetchLevels = () => {
  const [levelsList, setLevelsList] = useState<Level[]>([]);

  async function getLevelsListReg() {
    const response = await fetch('http://localhost:5173/api/level', {
      method: 'GET',
    });
    const result = await response.json();
    return result;
  }
  function getLevelsList() {
    getLevelsListReg().then((response) => {
      setLevelsList(response.items);
      console.log(response, 'response');
    });
  }
  return { getLevelsList, levelsList };
};

export default useFetchLevels;
