import { EditableField } from '@/shared/components/EditableField/EditableField';
import { Box, TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

function LessonIntro({ LessonDetails }: any) {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <EditableField
          defaultValue={LessonDetails.title}
          onSave={(newValue) => {
            LessonDetails.title = newValue;
          }}
          slotProps={{
            typography: {
              color: 'secondary',
              variant: 'h2',
            },
          }}
        />
        <EditableField
          defaultValue={LessonDetails.subtitle}
          onSave={(newValue) => {
            LessonDetails.subtitle = newValue;
          }}
          slotProps={{
            typography: {
              color: 'primary',
              variant: 'h6',
            },
          }}
        />

        <EditableField
          defaultValue={LessonDetails.description}
          onSave={(newValue) => {
            LessonDetails.description = newValue;
          }}
          slotProps={{
            typography: {
              color: 'tertiary',
              variant: 'body2',
            },
          }}
        />
      </Box>
    </>
  );
}

export default LessonIntro;
