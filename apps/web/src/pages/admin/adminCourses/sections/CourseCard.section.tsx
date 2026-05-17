// TODO: A "CourseCard" is a reusable visual unit tied to the `course` entity. Per the architecture rule, it belongs in `features/courses/components/CourseCard/`, not in a `pages/.../sections/` folder, since it would be reused on any page that lists courses. The `.section.tsx` suffix is for page-local compositions, not entity-bound cards.
// TODO: `console.log(ADMIN_COURSES_EDIT_URL(courseData.id))` — remove debug log.
// TODO: Imports `createSxStylesList` from `@/theme/helpers` — use the canonical `@/shared/helpers/styles/createSxStylesList.helper`.
// TODO: `<CardMedia>` is rendered with no `image=` prop — the title overlay covers a blank gray area. Use the course `image` field once the merged `Course` type has it.
// TODO: `<Button href={...}>` causes a full page reload; use react-router `<Link>`.
// TODO: `key={courseData.id}` is set on the `<Card>` here, but the parent already sets `key` on the list element when mapping. Keys belong on the mapped element only — remove this duplicate.
// TODO: `Chip color="info" label={courseData.LevelId}` shows a numeric FK to the user — show the level NAME (`A1`, `B1`, etc.), not the id. This requires joining with levels data on the page.
// TODO: `export const` here while many other sections use `export default function`. Standardize.
import { ADMIN_COURSES_EDIT_URL } from '@/shared/constants/urls.const';
import { createSxStylesList } from '@/theme/helpers';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import { Course } from '../types/course.type';

type CourseCardSectionProps = {
  courseData: Course;
};

export const CourseCardSection = ({ courseData }: CourseCardSectionProps) => {
  console.log(ADMIN_COURSES_EDIT_URL(courseData.id));
  return (
    <Card key={courseData.id} sx={sxStyles.card}>
      <CardMedia
        sx={{ height: 140, display: 'flex', justifyContent: 'end', p: 1 }}
        children={
          <Box>
            <Chip sx={{ mr: 1 }} color="success" label={courseData.status} />
            <Chip color="info" label={courseData.LevelId} />
          </Box>
        }
        title={courseData.name}
      />
      <CardContent sx={sxStyles.content}>
        <Typography gutterBottom variant="h4" component="div">
          {courseData.name}
        </Typography>
        <Box sx={{ flex: 1 }}></Box>
      </CardContent>

      <Divider variant="middle" />
      <CardActions sx={sxStyles.actions}>
        <Button href={ADMIN_COURSES_EDIT_URL(courseData.id)} variant="contained" fullWidth>
          Edit Course
        </Button>
      </CardActions>
    </Card>
  );
};
const sxStyles = createSxStylesList({
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 500,
    maxWidth: 345,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});
