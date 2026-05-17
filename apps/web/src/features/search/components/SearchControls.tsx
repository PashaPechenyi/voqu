import { FC } from 'react';
import { Box } from '@mui/material';
import SearchInput from './SearchInput';
import CourseStatusFilter from './CourseStatusFilter';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { CourseStatusFilterValue } from '../constants/courseStatusFilterOptions.const';

type SearchControlsProps = {
  onSearchChange: (value: string) => void;
  statusFilter?: CourseStatusFilterValue;
  onStatusFilterChange?: (value: CourseStatusFilterValue) => void;
};

const SearchControls: FC<SearchControlsProps> = ({
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <Box sx={sxStyles.root}>
      <Box sx={sxStyles.search}>
        <SearchInput onSearchChange={onSearchChange} />
      </Box>
      <Box sx={sxStyles.filter}>
        <CourseStatusFilter value={statusFilter} onChange={onStatusFilterChange} />
      </Box>
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: (theme) => ({
    width: 1,
    p: '20px',
    border: `3px solid ${theme.palette.tertiary.main}`,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '30px',
    gap: '10px',
    mt: '20px',
  }),
  search: { flex: 1 },
  filter: { width: '25%' },
});

export default SearchControls;
