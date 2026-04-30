import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
const LESSON_TYPES = ['grammar', 'reading', 'speaking', 'listening', 'quiz', 'test'];
type LessonModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainWord?: string;
  title?: string;
  description?: string;
  type?: (typeof LESSON_TYPES)[number];
  duration?:number
};


export default function LessonModal({
  isOpen,
  setIsOpen,
  mainWord,
  title,
  type,
  duration
}: LessonModalProps) {
  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          p: '20px',
          borderRadius: '20px',
          border: '3px solid grey',
          width: 1,
        },
      }}
    >
      <DialogTitle>
        {' '}
        <Typography variant="h4">{mainWord} Lesson</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {mainWord == 'Edit'
            ? 'Update lesson for this course.'
            : '  Create a new lesson for this course.'}
        </DialogContentText>

        <Box sx={{ width: 1 }}>
          <Typography variant="body2">Lesson title:</Typography>
          <TextField
            size="small"
            variant="outlined"
            defaultValue={title ? title : 'e.g., AdvancedGrammar Mastery'}
            // label="e.g., Present Simple"
            sx={{ width: 1, borderRadius: '30px' }}
          ></TextField>
        </Box>

        <Box sx={{ width: 1, display: 'flex', gap: '10px' }}>
          <Box sx={{ width: '50%' }}>
            <Typography>Type : </Typography>

            <Select
             defaultValue={type&& type }
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              label="Level"
              sx={{ width: 1 }}
              size="small"
            >
              {LESSON_TYPES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: '50%' }}>
            <Typography variant="body2">Duration(minutes):</Typography>
            <TextField size="small" variant="outlined" type="number" defaultValue={duration&& duration }></TextField>
          </Box>
        </Box>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Lock this lesson " />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button sx={{ backgroundColor: '#71677D', color: 'white', p: '10px' }}>
          {' '}
          {mainWord == 'Edit' ? 'Save changes' : ' Add lesson'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
