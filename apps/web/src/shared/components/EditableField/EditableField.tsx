import {
  TextField,
  Box,
  Button,
  Typography,
  TypographyProps,
  IconButton,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Label } from '@mui/icons-material';
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
    (toggleEditField(), newValue && onSave(newValue));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {isEditField ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <TextField
            placeholder="Add something"
            {...slotProps?.textfield}
            value={fieldValue}
            onChange={(el) => {
              setFieldValue(el.target.value);
            }}
          />

          <IconButton
            size="small"
            sx={{ height: 30, width: 30 }}
            onClick={() => {
              handleSave(fieldValue);
            }}
            children={<DoneIcon fontSize="small" />}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <Typography {...slotProps?.typography}>{fieldValue}</Typography>
          <IconButton
            size="small"
            onClick={() => handleSave()}
            children={<EditIcon fontSize="small" />}
            sx={{ height: 30, width: 30 }}
          />
        </Box>
      )}
    </Box>
  );
};
