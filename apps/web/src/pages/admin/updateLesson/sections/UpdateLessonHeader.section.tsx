import { LessonListItem } from '@/features/lesson/types/lessonListItem.type';
import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

import { EditableField } from '@/shared/components/EditableField/EditableField';
type UpdateLessonHeaderSectionProps = {
  lesson: LessonListItem;
};
export const UpdateLessonHeaderSection = ({ lesson }: UpdateLessonHeaderSectionProps) => {
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        defaultValue="title"
        onSave={(value) => {
          console.log(value, 'onsave');
        }}
        slotProps={{ typography: { mr: 2, variant: 'h3', color: 'adminPrimary' } }}
      />
      <EditableField
        defaultValue="subtitle"
        onSave={(value) => {
          console.log(value, 'onsave');
        }}
        slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
      />
      <EditableField
        defaultValue="description"
        onSave={(value) => {
          console.log(value, 'onsave');
        }}
        slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
      />
    </Box>
  );
};
const sxStyles = createSxStylesList({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});
