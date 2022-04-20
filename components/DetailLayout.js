import React from 'react';
import { Box, Container } from '@mui/material';
import TopBar from 'components/TopBar';

export default function DetailLayout({ page, color, children }) {
  return (
    <Box style={{ minHeight: '100vh', position: 'relative' }}>
      <TopBar page={page} color={color} leftButton={true} />
      <Container sx={{ pb: 5, pt: 10 }}>{children}</Container>
    </Box>
  );
}
