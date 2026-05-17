import { ChangeEvent, FC } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type SearchInputProps = {
  onSearchChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput: FC<SearchInputProps> = ({
  onSearchChange,
  placeholder = 'Search courses...',
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      label={placeholder}
      sx={sxStyles.field}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      onChange={handleChange}
    />
  );
};

const sxStyles = createSxStylesList({
  field: { width: 1, borderRadius: '30px' },
});

export default SearchInput;
