import { IsEnum } from 'class-validator';
import { LessonStatus } from '../../structs/lesson-status.enum';
import { IUpdateLessonStatusParams } from '../../structs/update-lesson-status-params.interface';

export class UpdateLessonStatusDto implements IUpdateLessonStatusParams {
  @IsEnum(LessonStatus)
  status: LessonStatus;
}
