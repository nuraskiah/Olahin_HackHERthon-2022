import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import TopBar from 'components/TopBar';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Leaderboard() {
  const { data, isLoading } = useQuery('leaderboard', async () => {
    const { data } = await axios.get('/api/leaderboard');
    return data;
  });

  return (
    <Box style={{ minHeight: '100vh', position: 'relative' }}>
      <TopBar page="Leaderboard" color="primary.main" leftButton={true} />
      <Container sx={{ pb: 5, pt: 10, backgroundColor: 'primary.main' }}>
        <Box sx={{ pt: 3 }}>
          <AvatarGroup
            max={3}
            sx={{
              alignItems: 'baseline',
              justifyContent: 'center',
            }}
          >
            <Avatar
              src={data?.[1].avatar?.[0].url}
              sx={{
                height: 80,
                width: 80,
              }}
            />
            <Avatar
              src={data?.[0].avatar?.[0].url}
              sx={{
                height: 100,
                width: 100,
                bottom: 20,
              }}
            />
            <Avatar
              src={data?.[2].avatar?.[0].url}
              sx={{
                height: 80,
                width: 80,
              }}
            />
          </AvatarGroup>
        </Box>
      </Container>
      <Container sx={{ paddingBlock: 5 }}>
        <List>
          {data?.map((user, i) => (
            <ListItem
              secondaryAction={<IconButton>{user.point || 0}</IconButton>}
            >
              <ListItemAvatar>{i + 1}</ListItemAvatar>
              <ListItemAvatar>
                <Avatar src={user.avatar?.[0].url} />
              </ListItemAvatar>
              <ListItemText
                primary={user.firstName + ` ${user.lastName || ''}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}
