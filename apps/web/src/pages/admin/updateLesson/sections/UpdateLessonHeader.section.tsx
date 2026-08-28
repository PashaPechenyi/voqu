import { Box } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { EditableField } from '@/shared/components/EditableField/EditableField';
import { LessonDetails } from '@/features/lesson/types/lessonDetails.type';
type UpdateLessonHeaderSectionProps = {
  lessonDetails: LessonDetails;
};
export const UpdateLessonHeaderSection = ({ lessonDetails }: UpdateLessonHeaderSectionProps) => {
  return (
    <Box sx={sxStyles.root}>
      <EditableField
        placeholder="title"
        defaultValue={lessonDetails.title.value}
        onSave={(value) => {
          console.log(value, 'onsave');
        }}
        slotProps={{ typography: { mr: 2, variant: 'h3', color: 'adminPrimary' } }}
      />
      <EditableField
        placeholder="subtitle"
        defaultValue={lessonDetails.subtitle.value}
        onSave={(value) => {
          console.log(value, 'onsave');
        }}
        slotProps={{ typography: { mr: 2, variant: 'h6', color: 'adminSecondary' } }}
      />
      <EditableField
        placeholder="description"
        defaultValue={lessonDetails.description.value}
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
