import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

// TODO: create global component in shared folder - ConfirmationModal
// it will be used everywhere where you need confirmation for something (delete/...)
type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainWord: string;
  title: string;
};

// TODO: rename file, component and props types to add Lesson
export default function DeleteModal({ isOpen, setIsOpen, mainWord, title }: DeleteModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          p: '20px',
          borderRadius: '20px',
          border: '4px solid red',
          width: 1,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" color="red">
          Delete {mainWord}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ p: '10px' }}>
          Cancel
        </Button>
        <Button sx={{ backgroundColor: 'red', color: 'white', p: '10px' }}>
          {' '}
          {mainWord == 'Lesson' ? 'Delete lesson' : ' Delete course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
