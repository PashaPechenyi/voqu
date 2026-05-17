// TODO: Uses `courses` mock data from `initialCourses.const` — the displayed list (`CoursesSection`) comes from the API. The autocomplete must be driven by the same real data, not by mocks.
// TODO: Component has no state and no `onChange` handler — the search input does literally nothing on the page right now. Wire the value into the parent so `CoursesSection` can filter.
// TODO: `id="free-solo-demo"` is leftover from MUI examples — give it a meaningful id (or omit).
// TODO: The second `<Autocomplete>` lists course IDs (UUIDs) as options for "categories" — wrong data. It should list course CATEGORIES (e.g. CEFR level, status), not ids.
// TODO: `getOptionLabel` is commented out for the second autocomplete — clean up.
// TODO: `width: '30%'` and other magic widths inline; extract to sxStyles.
import { courses } from '@/features/courses/constants/initialCourses.const';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Autocomplete, Box, TextField } from '@mui/material';

export default function SearchSection() {
  return (
    <Box sx={sxStyles.root}>
      <Autocomplete
        id="free-solo-demo"
        sx={sxStyles.input}
        freeSolo
        options={courses.map((option) => option.title)}
        size="small"
        renderInput={(params) => <TextField {...params} placeholder="Search courses" />}
      />
      <Autocomplete
        options={courses.map((option) => option.id)}
        size="small"
        sx={{ width: '30%' }}
        //getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} placeholder="With categories" />}
      />
    </Box>
  );
}

const sxStyles = createSxStylesList({
  root: {
    backgroundColor: '#fff',
    p: 3,
    border: '2px solid',
    borderColor: 'adminSecondary.main',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
    mb: 3,
  },
  input: {
    width: '70%',
    pr: 1,
  },
});
