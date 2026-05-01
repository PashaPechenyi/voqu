import { Box } from '@mui/material';
import SearchInput from './SearchInput';
import FilterButton from './FilterButton';

type SearchControlsProps = {
  setEnteredValue: any;
};

function SearchControls({ setEnteredValue }: SearchControlsProps) {
  return (
    <Box
      sx={{
        width: 1,
        p: '20px',
        border: '3px solid #aa9f96',
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '30px',
        gap: '10px',
        mt: '20px',
      }}
    >
      <SearchInput setEnteredValue={setEnteredValue} />
      <FilterButton />
    </Box>
  );
}

export default SearchControls;
