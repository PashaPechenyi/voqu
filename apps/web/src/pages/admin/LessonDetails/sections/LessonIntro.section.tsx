import { FC } from 'react';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { Box } from '@mui/material';
import { LessonDetails } from '@/features/lessons/types/lessonDetails.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { useUpdateLesson } from '@/features/lessons/hooks/useUpdateLesson';
import { LessonFormValues } from '@/features/lessons/types/lessonForm.type';

type LessonIntroProps = {
  lessonDetails: LessonDetails;
};
const convertToLessonFormValues = (lessonDetails: LessonDetails): LessonFormValues => {
  return {
    title: lessonDetails.title.value,
    subtitle: lessonDetails.subtitle.value,
    description: lessonDetails.description.value,
    status: lessonDetails.status ?? null,
  };
};

// Reviewed
const LessonIntro: FC<LessonIntroProps> = ({ lessonDetails }) => {
  const { updateLesson } = useUpdateLesson();

  const handleUpdateLesson = (data: Partial<LessonDetails>) => {
    const body = convertToLessonFormValues({
      ...lessonDetails,
      ...data,
    });
    updateLesson(lessonDetails.id, body);
  };

  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={lessonDetails.title.value}
        onSave={(newValue) => {
          handleUpdateLesson({ title: { value: newValue, translation: '' } });
        }}
        slotProps={{
          typography: {
            color: 'secondary',
            variant: 'h2',
          },
        }}
      />
      <EditableField
        defaultValue={lessonDetails.subtitle.value}
        onSave={(newValue) => {
          handleUpdateLesson({ subtitle: { value: newValue, translation: '' } });
        }}
        slotProps={{
          typography: {
            color: 'primary',
            variant: 'h6',
          },
        }}
      />
      <EditableField
        defaultValue={lessonDetails.description.value}
        onSave={(newValue) => {
          handleUpdateLesson({ description: { value: newValue, translation: '' } });
        }}
        slotProps={{
          typography: {
            color: 'tertiary',
            variant: 'body2',
          },
        }}
      />
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: { display: 'flex', flexDirection: 'column', gap: '10px' },
});

export default LessonIntro;
