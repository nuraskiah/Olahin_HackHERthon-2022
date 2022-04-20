import {
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

export default function RewardCard({ image, name, point, handleClickRedeem }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardMedia component="img" height="170" image={image} />
      <CardContent>
        <Typography fontWeight="bold">{name}</Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Typography>{point} pts</Typography>
        <Button onClick={handleClickRedeem}>Redeem</Button>
      </CardActions>
    </Card>
  );
}
