import { InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
type SearchInputProps={
  enteredValue:string,
  setEnteredValue:any
}
function SearchInput({enteredValue,setEnteredValue}:SearchInputProps) {

  return (
    <TextField
      size="small"
      variant="outlined"
      label="Search courses..."
      sx={{ width: '75%', borderRadius: '30px' }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      onChange={(value)=>{setEnteredValue(value.target.value)}}
    ></TextField>
  );
}
export default SearchInput;
