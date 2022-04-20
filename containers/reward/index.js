import { Box, Paper, Typography } from '@mui/material';
import MainLayout from 'components/MainLayout';
import RewardCard from './RewardCard';

import { useUser } from 'context/auth';
import { kontenbase } from 'lib/client';
import { useQuery } from 'react-query';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

export default function RewardList() {
  const [open, setOpen] = useState();
  const [selected, setSelected] = useState();
  const { user, setUser } = useUser();

  const { data, isLoading } = useQuery('rewards', async () => {
    const { data } = await kontenbase.service('Rewards').find();
    return data;
  });

  const handleClickRedeem = (reward) => {
    setOpen(true);
    setSelected(reward);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedeem = async () => {
    if (user.point < selected.point) {
      handleClose();
      return;
    }
    await kontenbase.auth.update({ point: user.point - selected.point });
    setUser({ ...user, point: user.point - selected.point });
  };

  return (
    <MainLayout value={4}>
      <Typography variant="h6">Hadiah</Typography>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          padding: '15px 25px',
          mb: 2,
          mt: 3,
        }}
      >
        <Typography variant="body" fontWeight="bold">
          Hi, {user.firstName}!
        </Typography>
        <Typography variant="body2">
          Terima kasih telah berpartisipasi dalam menyelamatkan Bumi. Yuk, tukar
          poin kamu dengan reward berikut!
        </Typography>
      </Paper>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ mt: 3 }}>
          {data?.map((reward) => (
            <RewardCard
              image={reward.image[0].url}
              name={reward.name}
              point={reward.point}
              handleClickRedeem={() => handleClickRedeem(reward)}
            />
          ))}
        </Box>
      )}

      <ConfirmModal
        open={open}
        handleClose={handleClose}
        handleRedeem={handleRedeem}
      />
    </MainLayout>
  );
}
