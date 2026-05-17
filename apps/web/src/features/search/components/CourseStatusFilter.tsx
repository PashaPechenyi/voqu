import { FC } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
  COURSE_STATUS_FILTER_OPTIONS,
  CourseStatusFilterValue,
} from '../constants/courseStatusFilterOptions.const';

type CourseStatusFilterProps = {
  value?: CourseStatusFilterValue;
  onChange?: (value: CourseStatusFilterValue) => void;
};

const CourseStatusFilter: FC<CourseStatusFilterProps> = ({ value = 'all', onChange }) => {
  const handleChange = (event: SelectChangeEvent<CourseStatusFilterValue>) => {
    onChange?.(event.target.value as CourseStatusFilterValue);
  };

  return (
    <Select value={value} onChange={handleChange} size="small" fullWidth>
      {COURSE_STATUS_FILTER_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CourseStatusFilter;
