import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Item({ icon, name, _key }) {
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
      <Box
        sx={{
          height: 125,
          width: 125,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e3e3e3',
          mb: 2,
          borderRadius: '10px',
        }}
      >
        <img
          src={icon}
          style={{
            height: 50,
            width: 50,
            display: 'block',
            justifySelf: 'center',
            marginBottom: '0.5rem',
            borderRadius: '5px',
          }}
        />
      </Box>
      <Typography align="center" variant="body">
        {name}
      </Typography>
    </Box>
  );
}
