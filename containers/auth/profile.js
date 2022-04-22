import { Avatar, Box, Container, Button, Typography } from '@mui/material';
import TopBar from 'components/TopBar';
import { useUser } from 'context/auth';
import { kontenbase } from 'lib/client';
import { useRouter } from 'next/router';

export default function Profile() {
  const { user } = useUser();
  const router = useRouter();
  const size = 150;

  const handleLogout = async () => {
    await kontenbase.auth.logout();
    router.push('/login');
  };

  return (
    <Box style={{ minHeight: '100vh', position: 'relative' }}>
      <TopBar page="Profile" color="primary.main" leftButton={true} />
      <Container sx={{ pb: 5, pt: 10, backgroundColor: 'primary.main' }}>
        <Box
          sx={{
            display: 'grid',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: '3rem',
            pt: 3,
          }}
        >
          <Avatar
            src={user.avatar[0].url}
            sx={{
              width: size,
              height: size,
              marginBottom: '1.5rem',
              justifySelf: 'center',
            }}
          />
          <Typography variant="h6" align="center">
            {user.firstName + (user.lastName ? ` ${user.lastName}` : '')}
          </Typography>
        </Box>
      </Container>
      <Container sx={{ py: 3 }}>
        <Box>
          <Data title="Email" value={user.email} />
          <Data title="Point" value={user.point || 0} />
        </Box>
        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

const Data = ({ title, value }) => {
  return (
    <Box sx={{ margin: '2rem' }}>
      <Typography align="center" fontWeight="bold">
        {title}
      </Typography>
      <Typography align="center">{value}</Typography>
    </Box>
  );
};
