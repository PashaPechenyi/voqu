import { FC } from 'react';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { Box } from '@mui/material';
import { LessonDetails, LessonDetailsStructure } from '@/features/lessons/types/lessonDetails.type';
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
    status: null,
  };
};

const LessonIntro: FC<LessonIntroProps> = ({ lessonDetails }) => {
  const { updateLesson } = useUpdateLesson();
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={lessonDetails.title.value}
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
        onSave={(newValue) => {
          // lessonDetails.title.value = newValue;
          updateLesson(
            lessonDetails.id,
            convertToLessonFormValues({
              ...lessonDetails,
              title: { value: newValue, translation: '' },
            }),
          );
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
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
        onSave={(newValue) => {
          // lessonDetails.subtitle.value = newValue;
          updateLesson(
            lessonDetails.id,
            convertToLessonFormValues({
              ...lessonDetails,
              title: { value: newValue, translation: '' },
            }),
          );
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
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
        onSave={(newValue) => {
          lessonDetails.description.value = newValue;
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
