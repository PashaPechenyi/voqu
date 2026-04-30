// import { Label } from '@mui/icons-material';
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material';
// import React from 'react';
// type DeleteLessonModuleProps = {
//   isOpen: boolean;
//   setIsOPen: React.Dispatch<React.SetStateAction<boolean>>;
//   title:string,
//   mainWord:string
// };
// const LESSON_TYPES = ['grammar', 'reading', 'speaking', 'listening', 'quiz', 'test'];

// function DeleteLessonModule({ isOpen, setIsOPen, title, mainWord }: DeleteLessonModuleProps) {
//   return (
//     <Box
//       sx={
//         !isOpen
//           ? { display: 'none' }
//           : {
//               display: 'flex',
//               backgroundColor: 'white',
//               flexDirection: 'column',
//               alignItems: 'start',
//               justifyContent: 'center',
//               position: 'absolute',
//               zIndex: 2,
//               right: '15%',
//               bottom: '30%',
//               p: '30px 50px',
//               borderRadius: '20px',
//               border: '3px solid red',

//               gap: '20px',
//             }
//       }
//     >
//       <Box sx={{width:1, }}>
//         {' '}
//         <Typography variant="h5" color="red">
//           {' '}
//          Delete {mainWord}
//         </Typography>
//         <Typography variant="body1" color="primary">
//          Are you sure you want to delete "{title}"? This action cannot be undone.
//         </Typography>
//       </Box>

//       <Box sx={{ width: 1, display: 'flex', justifyContent: 'end', gap: '20px' }}>
//         <Button sx={{ p: '10px' }} onClick={() => setIsOPen(false)}>
//           Cancel
//         </Button>
//         <Button
//           sx={{ backgroundColor: 'red', color: 'white', p: '10px' }}
//           onClick={() => setIsOPen(false)}
//         >
//           Delete {mainWord}
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default DeleteLessonModule;
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

type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainWord: string;
  title: string;
};

export default function DeleteModal({ isOpen, setIsOpen, mainWord, title }: DeleteModalProps) {
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
          border: '4px solid red',
          width: 1,
        },
      }}
    >
      <DialogTitle>
        {' '}
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
