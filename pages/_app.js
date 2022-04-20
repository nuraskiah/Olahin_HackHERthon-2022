import React from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from 'context/auth';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import '../styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>HackHERthon</title>
        <meta
          name="description"
          content="HackHERthon Submission for Ikigai Team"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
