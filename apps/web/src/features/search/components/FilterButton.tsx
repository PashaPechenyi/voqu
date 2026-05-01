import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import React from 'react';

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
