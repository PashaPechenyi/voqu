import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../../../common/http/dto/pagination.dto';

export class ListLessonsQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  CourseId?: string;
}
