import { Box } from '@mui/material';

type SectionCounterDecorationProps = {
  ind: number;
};

function SectionCounterDecoration({ ind }: SectionCounterDecorationProps) {
  return (
    <Box
      sx={{
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          height: '95px',
          // my: -5,
          width: '3px',
          backgroundColor: 'grey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Box>
      <Box
        sx={{
          width: '70px',
          height: '70px',
          borderRadius: '100%',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#71677D',
          border: '5px solid #dfdde1ff',
        }}
      >
        {ind + 1}
      </Box>
      <Box
        sx={{
          height: '115px',
          width: '3px',
          backgroundColor: 'grey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></Box>
    </Box>
  );
}

export default SectionCounterDecoration;
