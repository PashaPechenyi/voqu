import {
  TextField,
  Box,
  Typography,
  TypographyProps,
  IconButton,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { createSxStylesList } from '@/shared/helpers/styles/createSxStylesList.helper';

type EditableFieldProps = {
  slotProps?: {
    typography?: TypographyProps;
    textfield?: TextFieldProps;
  };
  defaultValue: string;
  onSave: (newValue: string) => void;
};

export const EditableField = ({ defaultValue, slotProps, onSave }: EditableFieldProps) => {
  const [isEditField, setIsEditField] = useState<boolean>(!defaultValue);
  const [fieldValue, setFieldValue] = useState<string>(defaultValue);
  const toggleEditField = () => {
    setIsEditField((prev) => !prev);
  };

  const handleSave = (newValue?: string) => {
    toggleEditField();
    if (newValue) onSave(newValue);
  };

  return (
    <Box sx={sxStyles.root}>
      {isEditField ? (
        <Box sx={sxStyles.row}>
          <TextField
            placeholder="Add something"
            {...slotProps?.textfield}
            value={fieldValue}
            onChange={(event) => {
              setFieldValue(event.target.value);
            }}
          />

          <IconButton
            size="small"
            sx={sxStyles.iconButton}
            onClick={() => {
              handleSave(fieldValue);
            }}
          >
            <DoneIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box sx={sxStyles.row}>
          <Typography {...slotProps?.typography}>{fieldValue}</Typography>
          <IconButton size="small" onClick={() => handleSave()} sx={sxStyles.iconButton}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

const sxStyles = createSxStylesList({
  root: { display: 'flex', flexDirection: 'column', gap: '10px' },
  row: { display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center' },
  iconButton: { height: 30, width: 30 },
});
