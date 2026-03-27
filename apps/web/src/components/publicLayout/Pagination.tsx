import { Box } from '@mui/material';
import React from 'react';
type PaginationType = {
  activeWordNumber: number;
  wordsAmount: number;
};

function Pagination({ wordsAmount, activeWordNumber }: PaginationType) {
  return (
    <Box sx={{ color: '#71677D', display: 'flex', gap: '10px', fontSize: '16px' }}>
      <Box
        sx={{
          width: '30px',
          height: '30px',
          borderRadius: '100%',
          backgroundColor: '#37123c',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {activeWordNumber + 1}
      </Box>
      of {wordsAmount}
    </Box>
  );
}

export default Pagination;
