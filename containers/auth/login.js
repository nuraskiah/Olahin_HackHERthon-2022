import react from 'react';
import { Container, Button } from '@mui/material';
import Cookies from 'js-cookie';

import { useAuthentication } from 'hooks/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { login } = useAuthentication();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await login.mutateAsync({
        email: 'meow@gmail.com',
        password: 'meow123',
      });

      Cookies.set('token', data.accessToken, { expires: 30 });
      localStorage.setItem('token', data.token);

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </form>
    </Container>
  );
}
