import { httpClient } from '@/shared/api';
import { Level } from '../types/level.type';

export type GetLevelsResponse = { items: Level[] };

export const getLevelsReq = async () => {
  return httpClient.get<GetLevelsResponse>(`/level`);
};
