import { Box } from '@mui/material';
import React from 'react';
import SearchInput from './SearchInput';
import FilterButton from './FilterButton';
type SearchControlsProps={
  enteredValue:string,
  setEnteredValue:any
}
function SearchControls({enteredValue,setEnteredValue}:SearchControlsProps) {
  return (
    <Box
      sx={{
        width: 1,
        p: '20px',
        border: '3px solid #aa9f96',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '30px',
        gap:"10px",
        mt:"20px"
      }}
    >
      <SearchInput enteredValue={enteredValue} setEnteredValue={setEnteredValue} />
      <FilterButton />
    </Box>
  );
}

export default SearchControls;
