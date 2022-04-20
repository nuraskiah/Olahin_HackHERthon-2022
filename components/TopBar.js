import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export default function TopBar({ page, color, leftButton }) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Box sx={{ flexGrow: 1, position: 'relative' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: color || 'white',
        }}
      >
        <Toolbar>
          {leftButton && (
            <IconButton
              size="large"
              edge="start"
              color="default"
              sx={{ mr: 1, color: color ? 'white' : 'black' }}
              onClick={handleClick}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: color ? 'white' : 'black' }}
          >
            {page}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
