import { Level } from '@/features/levels/types/level.type';

// RENAME: extracted inline response shape -> named GetLevelsDTO - API-response types end with DTO
type GetLevelsDTO = {
  items: Level[];
  success: boolean;
};

export const getLevelsReq = async (): Promise<GetLevelsDTO> => {
  const response = await fetch('/api/level', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Something went wrong...');
  }
  return response.json();
};
