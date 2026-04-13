import { Autocomplete, Box, TextField } from '@mui/material';
import { createSxStylesList } from '@/theme/helpers';
import { courses } from '@/consts/adminConsts/initialCourses';

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
