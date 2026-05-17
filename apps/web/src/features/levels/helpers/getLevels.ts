import { Level } from '@/features/levels/types/level.type';

const getLevels = async (): Promise<Level[] | undefined> => {
  try {
    const response = await fetch('/api/level', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Something went wrong...');
    }
    return await response.json();
  } catch (error) {
    return undefined;
  }
};

export default getLevels;
