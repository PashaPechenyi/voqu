import { Level } from '@/features/levels/types/level.type';

export const getLevelsReq = async (): Promise<{ items: Level[]; success: boolean }> => {
  const response = await fetch('/api/level', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
