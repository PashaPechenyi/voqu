import { Word } from '@/features/vocabulary/types/word.types';
import { Box } from '@mui/material';
type SliderIndicatorType = {
  words: Word[];
};

function SliderIndicator({ words }: SliderIndicatorType) {
  return (
    <Box sx={{ display: 'flex', gap: '5px', px: '20px' }}>
      {words.map((_, ind) => {
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
  );
}

export default SliderIndicator;
