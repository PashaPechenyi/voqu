import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';
import { Box, IconButton, TextField, Typography, TypographyProps } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

type EditableFieldProps = {
  slotProps: {
    typography?: TypographyProps;
  };
  defaultValue: string;
  onSave: (value: string) => void;
};

export const EditableField = ({ defaultValue, slotProps, onSave }: EditableFieldProps) => {
  const [isEdit, setIsEdit] = useState(true);
  const [value, setValue] = useState(defaultValue);
  const handleSave = () => {
    onSave(value);
    setIsEdit((prev) => !prev);
  };
  return (
    <>
      {isEdit ? (
        <Box sx={sxStyles.row}>
          <TextField
            variant="standard"
            sx={{ mr: 2, width: '30%' }}
            defaultValue={defaultValue}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
          />

          <IconButton size="medium" onClick={handleSave}>
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
