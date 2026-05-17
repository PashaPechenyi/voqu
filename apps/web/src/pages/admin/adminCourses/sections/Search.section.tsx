import { Autocomplete, Box, TextField } from '@mui/material';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

function SearchSection() {
  return (
    <Box sx={sxStyles.root}>
      <Autocomplete
        sx={sxStyles.input}
        freeSolo
        options={[]}
        size="small"
        renderInput={(params) => <TextField {...params} placeholder="Search courses" />}
      />
      <Autocomplete
        options={[]}
        size="small"
        sx={sxStyles.categories}
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
  categories: {
    width: '30%',
  },
});

export default SearchSection;
