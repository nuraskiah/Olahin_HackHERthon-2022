import React from 'react';
import { Box, Container } from '@mui/material';
import BottomNavbar from 'components/BottomNavbar';
import TopBar from './TopBar';

export default function MainLayout({
  value,
  topBar,
  bottomBar = true,
  page,
  leftButton,
  children,
}) {
  return (
    <Box style={{ minHeight: '100vh', position: 'relative' }}>
      {topBar && <TopBar page={page} leftButton={leftButton} />}
      <Container sx={{ paddingBlock: 5 }}>{children}</Container>
      {bottomBar && <BottomNavbar value={value} />}
    </Box>
  );
}
