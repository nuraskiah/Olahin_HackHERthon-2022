import { Avatar, Box, Container, Divider, Typography } from '@mui/material';
import DetailLayout from 'components/DetailLayout';
import TopBar from 'components/TopBar';
import { useUser } from 'context/auth';

export default function Profile() {
  const { user } = useUser();
  const size = 150;

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
