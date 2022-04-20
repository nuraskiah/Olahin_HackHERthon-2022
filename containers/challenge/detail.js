import { Button, Typography } from '@mui/material';
import DetailLayout from 'components/DetailLayout';
import { useUser } from 'context/auth';
import { kontenbase } from 'lib/client';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function ChallengeDetail({ id }) {
  const { data, isLoading } = useQuery('challenge', async () => {
    const { data } = await kontenbase.service('Challenges').getById(id);
    return data;
  });

  const { user, setUser } = useUser();
  const router = useRouter();

  const handleComplete = async () => {
    await kontenbase.auth.update({ point: user.point + data.point });
    setUser({ ...user, point: user.point + data.point });
    router.push('/');
  };

  return (
    <DetailLayout page="Challenge">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Typography>{data.name}</Typography>
          <Typography>{`+${data.point} pts`}</Typography>

          <Typography>Tentang Challenge Ini</Typography>
          <Typography>{data.description}</Typography>

          <Button fullWidth varian="contained" onClick={handleComplete}>
            Selesaikan challenge
          </Button>
        </>
      )}
    </DetailLayout>
  );
}
