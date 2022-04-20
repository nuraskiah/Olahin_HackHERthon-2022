import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

export default function ArticleCard({ image, title, subtitle, slug }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/article/' + slug);
  };

  return (
    <Card sx={{ maxWidth: 250, flexShrink: 0 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {title}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
