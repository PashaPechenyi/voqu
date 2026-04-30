import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import React from 'react';

function FilterButton() {
  const options = ['All courses', 'Published', 'Draft'];
  return (
    <Box sx={{width:"25%"}}>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        defaultValue={'All courses'}
        sx={{ width: 1, }}
        size="small"

      >
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
