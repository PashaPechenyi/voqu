import { httpClient } from '@/shared/api';
import { Level } from '../types/level.type';

export type GetLevelsResponse = { items: Level[] };

// export const getLevelsReq = async (): Promise<GetLevelsResponse> => {
//   const response = await fetch('/api/level', { method: 'GET' });
//   if (!response.ok) throw new Error('Failed to fetch levels');
//   return response.json();
// };
export const getLevelsReq = async () => {
  return httpClient.get<GetLevelsResponse>(`/level`);
};
