import { Box, MenuItem, Select } from '@mui/material';

// FIXME: review feature name and components names

function FilterButton() {
  const options = ['All courses', 'Published', 'Draft'];
  return (
    <Box sx={{ width: '25%' }}>
      <Select defaultValue={'All courses'} sx={{ width: 1 }} size="small">
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default FilterButton;
