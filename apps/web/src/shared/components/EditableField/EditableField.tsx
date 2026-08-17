import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, IconButton, TextField, Typography, TypographyProps } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

type EditableFieldProps = {
  slotProps: {
    typography?: TypographyProps;
  };
  placeholder?: string;
  onSave: (value: string) => void;
  required?: boolean;
  defaultValue?: string;
};

export const EditableField = ({
  placeholder,
  slotProps,
  onSave,
  required,
  defaultValue,
}: EditableFieldProps) => {
  const [isEdit, setIsEdit] = useState(!defaultValue);
  const [value, setValue] = useState(defaultValue || '');
  const handleSave = () => {
    console.log(value);
    onSave(value);
    setIsEdit((prev) => !prev);
  };
  const handleDisabled = value === '';
  return (
    <>
      {isEdit ? (
        <Box sx={sxStyles.row}>
          <TextField
            variant="standard"
            sx={{ mr: 2, width: '30%' }}
            placeholder={placeholder}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />

          <IconButton disabled={handleDisabled} size="medium" onClick={handleSave}>
            <CheckIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box sx={sxStyles.row}>
          <Typography {...slotProps.typography}>{value}</Typography>
          <IconButton size="medium" onClick={() => setIsEdit((prev) => !prev)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </>
  );
};
const sxStyles = createSxStylesList({
  row: {
    display: 'flex',
    flexDirection: 'row',
    mb: 1,
  },
});
