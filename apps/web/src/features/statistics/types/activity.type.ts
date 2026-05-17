import { MuiColor } from '@/shared/types/sx.type';
import { ActivityType } from '../enums/activityType.enum';

export type Activity = {
  id: string;
  type: ActivityType;
  label: string;
  name: string;
  time: string;
  color: MuiColor;
};
