import { Word } from '@/theme/types';
import { Box } from '@mui/material';
import React from 'react'
type SliderIndicatorType={
    words: Word[]
}

function SliderIndicator({words}:SliderIndicatorType) {
  return (
    <Box sx={{ display: 'flex', gap: '5px', px: '20px' }}>
              {words.map((el, ind) => {
                return (
                  <Box
                    key={ind}
                    sx={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '100%',
                      backgroundColor: '#71677D',
                    }}
                  />
                );
              })}
            </Box>
  )
}

export default SliderIndicator
