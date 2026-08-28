import { httpClient } from '@/shared/api';
import { Level } from '../types/level.type';
type LevelDTO = {
  items: Level[];
  success?: true;
};
export const getLevelsReq = () => httpClient.get<LevelDTO>('/level');
