import { Box, Typography } from '@mui/material';
import DetailLayout from 'components/DetailLayout';

import { kontenbase } from 'lib/client';
import { useQuery } from 'react-query';

export default function Article({ slug }) {
  const { data, isLoading } = useQuery('article', async () => {
    const { data } = await kontenbase
      .service('Articles')
      .find({ where: { slug } });
    return data[0];
  });

  return (
    <DetailLayout page="Artikel">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Box sx={{ height: 200, overflow: 'hidden' }}>
            <img
              src={data.image[0].url}
              style={{
                width: '100%',
              }}
            />
          </Box>
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              {data.title}
            </Typography>
            <Typography variant="caption">{data.subtitle}</Typography>
          </Box>
          <Box>
            <Typography>{data.content}</Typography>
          </Box>
        </>
      )}
    </DetailLayout>
  );
}
