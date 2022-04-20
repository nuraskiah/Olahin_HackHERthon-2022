import { Box, Typography, Divider, Paper } from '@mui/material';
import ChallengeCard from 'components/ChallengeCard';
import MainLayout from 'components/MainLayout';
import { kontenbase } from 'lib/client';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export default function ChallengeList() {
  const router = useRouter();
  const { data, isLoading } = useQuery('challenges', async () => {
    const { data } = await kontenbase.service('Challenges').find({
      where: {
        status: 'active',
      },
    });
    return data;
  });

  const handleClick = (id) => {
    router.push('/challenges/' + id);
  };

  return (
    <MainLayout value={3}>
      <Typography variant="h6">Challenge</Typography>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box>
          {data.map((chal) => (
            <ChallengeCard chal={chal} handleClick={handleClick} />
          ))}
        </Box>
      )}
    </MainLayout>
  );
}
