import { Paper, Typography } from '@mui/material';

export default function ChallengeCard({ chal, handleClick }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '15px 25px',
        mb: 1,
      }}
      onClick={() => handleClick(chal._id)}
    >
      <Typography fontWeight="bold">{chal.name}</Typography>
      <Typography
        sx={{ color: 'secondary.main' }}
      >{`+${chal.point} pts`}</Typography>
    </Paper>
  );
}
