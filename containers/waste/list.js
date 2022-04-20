import { Box, Typography } from '@mui/material';
import MainLayout from 'components/MainLayout';
import Item from './components/Item';

import { useQuery } from 'react-query';
import { kontenbase } from 'lib/client';

export default function WasteList() {
  const { data, isLoading } = useQuery('categories', async () => {
    const { data } = await kontenbase.service('Categories').find();
    return data;
  });

  return (
    <MainLayout value={1}>
      <Typography variant="h6">Sampah</Typography>
      <Box
        sx={{
          padding: 4,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {!isLoading &&
          data.map((cat) => (
            <Item key={cat._id} name={cat.name} _key={cat.key} />
          ))}
      </Box>
    </MainLayout>
  );
}
