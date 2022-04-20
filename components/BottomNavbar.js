import React from 'react';
import Link from 'next/link';

import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  styled,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import BallotIcon from '@mui/icons-material/Ballot';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SearchIcon from '@mui/icons-material/Search';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const BottomNavigationAction = (props) => {
  return (
    <Link href={props.href} passHref>
      <MuiBottomNavigationAction {...props} />
    </Link>
  );
};

export default function BottomNavbar({ value: initValue }) {
  const [value, setValue] = React.useState(initValue || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={0}
    >
      <BottomNavigation
        sx={styles.container}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          sx={styles.action}
          icon={<HomeIcon />}
          href={'/'}
        />
        <BottomNavigationAction
          sx={styles.action}
          icon={<SearchIcon />}
          href={'/wastes'}
        />
        <BottomNavigationAction
          sx={styles.action}
          icon={<CameraAltIcon />}
          href={'/wastes/classify'}
        />
        <BottomNavigationAction
          sx={styles.action}
          icon={<BallotIcon />}
          href={'/challenges'}
        />
        <BottomNavigationAction
          sx={styles.action}
          icon={<ConfirmationNumberIcon />}
          href={'/rewards'}
        />
      </BottomNavigation>
    </Paper>
  );
}

const styles = {
  container: {
    backgroundColor: 'primary.main',
    color: 'white',
  },
  action: {
    '& .MuiBottomNavigationAction-label': {
      fontSize: '0.65rem',
    },
    '& .MuiBottomNavigationAction-root, .Mui-selected, svg': {
      color: 'white',
    },
    '& .Mui-selected, .Mui-selected > svg': {
      color: 'white',
    },
  },
};
