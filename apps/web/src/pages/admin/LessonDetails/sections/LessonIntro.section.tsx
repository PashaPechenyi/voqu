import { FC } from 'react';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { Box } from '@mui/material';
import { LessonDetails, LessonDetailsStructure } from '@/features/lessons/types/lessonDetails.type';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

// RENAME: LessonDetails (prop) -> lessonDetails - props are camelCase
type LessonIntroProps = {
  lessonDetails: LessonDetails;
};

const LessonIntro: FC<LessonIntroProps> = ({ lessonDetails }) => {
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue={lessonDetails.title.value}
        // TODO: mutating the prop directly won't trigger a re-render; lift state up and pass an updater callback.
        onSave={(newValue) => {
          lessonDetails.title.value = newValue;
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
          lessonDetails.subtitle.value = newValue;
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
