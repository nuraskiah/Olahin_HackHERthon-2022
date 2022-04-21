import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DetailLayout from 'components/DetailLayout';

import { useQuery } from 'react-query';
import { kontenbase } from 'lib/client';

export default function WasteDetail({ _key }) {
  const { data, isLoading } = useQuery('category', async () => {
    const { data } = await kontenbase
      .service('Categories')
      .find({ where: { key: _key }, lookup: ['solutions'] });
    return data[0];
  });

  return (
    <DetailLayout page="Sampah">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        data && (
          <>
            <Box sx={{ height: 200, overflow: 'hidden' }}>
              <img
                src={data.image[0].url || 'https://placehold.co/500x500'}
                style={{
                  width: '100%',
                }}
              />
            </Box>
            <Box sx={{ my: 3 }}>
              <Typography variant="h4" fontWeight="bold">
                {data.name}
              </Typography>
            </Box>
            <Box>
              <Typography>{data.description}</Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h4" fontWeight="bold">
                Mitra
              </Typography>
              <List>
                {data.solutions.map((s, i) => (
                  <ListItem sx={{ justifyContent: 'flex-end' }}>
                    <ListItemText primary={'- ' + s.name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        )
      )}
    </DetailLayout>
  );
}
