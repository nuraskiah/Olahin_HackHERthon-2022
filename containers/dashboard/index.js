import { Avatar, Box, Button, Paper, SvgIcon, Typography } from '@mui/material';
import ArticleCard from 'components/ArticleCard';
import Layout from 'components/MainLayout';

// import Logo from '/assets/olahin-type.svg';

import { useUser } from 'context/auth';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { kontenbase } from 'lib/client';

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  // console.log(Logo);

  const { data: chal, isLoading } = useQuery('challenge', async () => {
    const { data } = await kontenbase.service('Challenges').find({
      where: {
        type: ['daily'],
        status: 'active',
      },
    });
    return data[0];
  });

  const { data: articles, isLoading: isLoadingArticle } = useQuery(
    'articles',
    async () => {
      const { data } = await kontenbase.service('Articles').find();
      return data;
    }
  );

  const handleAvatarClick = () => {
    router.push('/profile');
  };

  const handleChallengeClick = () => {
    router.push('/challenges/' + chal._id);
  };

  const handleLeadClick = () => {
    router.push('/leaderboard');
  };

  return (
    <Layout>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <Box>
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <img
                  src={'/assets/olahin-type.svg'}
                  style={{
                    display: 'block',
                    height: '2rem',
                  }}
                />
              </Box>
              <Typography variant="body">Hai, {user.firstName}!</Typography>
            </Box>
            <Box onClick={handleAvatarClick}>
              <Avatar src={user.avatar[0].url} />
            </Box>
          </Box>
          <Paper
            elevation={0}
            sx={{
              padding: '15px 25px',
              marginTop: 2,
              marginBottom: 5,
              backgroundColor: 'primary.main',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: 'white' }}>
                Point kamu
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: 'white' }}
                fontWeight="bold"
              >
                {user.point || 0}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLeadClick}
              >
                Leaderboard
              </Button>
            </Box>
          </Paper>

          <Typography variant="h6">Misi Hari Ini</Typography>

          <Paper
            variant="outlined"
            sx={{
              padding: '15px 25px',
              marginBottom: 5,
              // backgroundColor: 'primary.main',
            }}
            onClick={handleChallengeClick}
          >
            <Typography fontWeight="bold">{chal.name}</Typography>
            <Typography
              sx={{ color: 'secondary.main' }}
            >{`+${chal.point} pts`}</Typography>
          </Paper>

          <Typography variant="h6">Tahukah Kamu?</Typography>

          <Box
            sx={{ display: 'flex', overflowX: 'scroll', gap: 3, paddingTop: 1 }}
          >
            {articles?.map((a) => (
              <ArticleCard
                image={a.image[0].url}
                title={a.title}
                subtitle={a.subtitle}
                slug={a.slug}
                key={a.slug}
              />
            ))}
          </Box>

          <Paper
            variant="outlined"
            sx={{
              padding: '15px 25px',
              marginBottom: 5,
              marginTop: 5,
              display: 'flex',
              gap: '10px',
              justifyContent: 'space-between',
              // backgroundColor: 'primary.main',
            }}
          >
            <Box>
              <Typography fontWeight="bold">Indeks Kualitas Udara</Typography>
              <Typography variant="body2" marginBottom={1}>
                Medan, Sumatera Utara
              </Typography>
              <Typography
                fontStyle="italic"
                fontSize="0.7rem"
                lineHeight={'1rem'}
              >
                Udaranya hari ini bagus. Sangat sempurna untuk jalan kaki!
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
              }}
            >
              <Typography
                variant="h6"
                lineHeight={'1rem'}
                sx={{ color: 'success.dark' }}
              >
                78
              </Typography>
              <Typography variant="caption" sx={{ color: 'success.dark' }}>
                good
              </Typography>
            </Box>
          </Paper>
        </>
      )}
    </Layout>
  );
}
