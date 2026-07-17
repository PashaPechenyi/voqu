// RENAME: UseUpdateLesson -> useUpdateLesson - hooks are camelCase (must start with lowercase `use`)
import { LessonListItem } from '../types/lesson.type';
import { LessonFormValues } from '../types/lessonForm.type';
import { editLessonReq } from '../helpers/editLessonReq.helper';
import { useMutation } from '@/shared/api';

type UseUpdateLessonOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

// TODO: onError is not used
export const useUpdateLesson = ({ onSuccess, onError }: UseUpdateLessonOptions = {}) => {
  const {
    isLoading,
    error,
    mutate: updateLesson,
  } = useMutation({
    mutationFn: (id: LessonListItem['id'], body: LessonFormValues) => editLessonReq(id, body),
    onSuccess: () => onSuccess?.(),
  });

  return { updateLesson, isLoading, error };
};
