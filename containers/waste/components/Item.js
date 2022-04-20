import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Item({ name, _key }) {
  const router = useRouter();
  const handleClick = () => {
    router.push('/wastes/' + _key);
  };

  return (
    <Box
      sx={{
        width: 125,
        display: 'grid',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 4,
      }}
      onClick={handleClick}
    >
      <img
        src="https://placehold.co/50"
        style={{
          height: 125,
          width: 125,
          display: 'block',
          justifySelf: 'center',
          marginBottom: '0.5rem',
          borderRadius: '5px',
        }}
      />
      <Typography align="center" variant="body">
        {name}
      </Typography>
    </Box>
  );
}
