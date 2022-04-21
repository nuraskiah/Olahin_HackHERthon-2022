import { Button, Typography } from '@mui/material';
import DetailLayout from 'components/DetailLayout';
import { useUser } from 'context/auth';
import { kontenbase } from 'lib/client';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useNotif from 'hooks/notif';

export default function ChallengeDetail({ id }) {
  const { data, isLoading } = useQuery('challenge', async () => {
    const { data } = await kontenbase.service('Challenges').getById(id);
    return data;
  });

  const { user, setUser } = useUser();
  const router = useRouter();
  const notif = useNotif();

  const handleComplete = async () => {
    await kontenbase.auth.update({ point: user.point + data.point });
    setUser({ ...user, point: user.point + data.point });
    notif.success('Challenge berhasil diselesaikan.');
    router.push('/');
  };

  return (
    <DetailLayout page="Challenge">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'secondary.main' }}
          >{`+${data.point} pts`}</Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Tentang Challenge Ini
          </Typography>
          <Typography>{data.description}</Typography>

          <Button
            fullWidth
            varian="contained"
            onClick={handleComplete}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              mt: 5,
            }}
          >
            Selesaikan challenge
          </Button>
        </>
      )}
    </DetailLayout>
  );
}
