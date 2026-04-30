import { Height } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import DeleteLessonModule from './DeleteModal';

import LessonModal from './LessonModal';
type LessonForEditProps = {
  icon: any;
  title: string;
  type: string;
  duration: number;
  ind: number;
};

function LessonForEdit({ icon, title, type, duration, ind }: LessonForEditProps) {
  const Icon = icon;
  const [isOpenDeleteModel, setIsOPenDeleteModal] = useState(false);
  const [isOpenChangeModel, setIsOpenChangeModal] = useState(false);
  return (
    <>
      {' '}
      <Box
        sx={{
          p: '20px',
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'space-between' },
          alignItems: { xs: 'flex-start', md: 'center' },
          position: 'relative',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Box
            sx={{
              width: '45px',
              height: '45px',
              borderRadius: '100%',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              m: '0  0 20px 15px ',
              backgroundColor: '#37123c',
            }}
          >
            {ind + 1}
          </Box>
          <Box
            sx={{
              width: '45px',
              height: '45px',
              borderRadius: '100%',
              border: '2.5px solid grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              m: '0  0 20px 15px ',
            }}
          >
            <Icon sx={{ fill: 'grey', with: '20px', Height: '20px' }} />
          </Box>
          <Box>
            <Typography variant="h6" color="secondary">
              {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Typography variant="body1" color="tertiary">
                {duration} min
              </Typography>
              <Typography
                sx={{
                  border: ' 1px solid  grey',
                  borderRadius: '20px',
                  p: '3px 15px',
                  fontSize: '13px',
                }}
                color="tertiary"
              >
                {type}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', gap: '20px' }}
         
        >
          <Button sx={{ border: '2px solid grey' }}
           onClick={() => {
            setIsOpenChangeModal(true);
          }}>
            <EditIcon />
          </Button>
          <Button sx={{ border: '2px solid grey' }}>
            <LockIcon />
          </Button>
          <Button
            sx={{ border: '2px solid red' }}
            onClick={() => {
              setIsOPenDeleteModal(true);
            }}
          >
            <DeleteIcon sx={{ fill: 'red' }} />
          </Button>
          <DeleteLessonModule
            isOpen={isOpenDeleteModel}
            setIsOpen={setIsOPenDeleteModal}
            title={title}
            mainWord="Lesson"
          />
        </Box>
      </Box>{' '}
      <LessonModal
        isOpen={isOpenChangeModel}
        setIsOpen={setIsOpenChangeModal}
        title={title}
        type={type}
        duration={duration}
        mainWord='Edit'
      />
    </>
  );
}

export default LessonForEdit;
