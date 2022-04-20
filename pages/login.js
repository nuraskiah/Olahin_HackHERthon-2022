import Login from 'containers/auth/login';
import getCookie from 'utils/getCookie';
import { setToken } from 'context/auth';
import { kontenbase } from 'lib/client';

export default Login;

export const getServerSideProps = async (context) => {
  try {
    const token = getCookie(context.req, 'token');

    setToken(token);
    const data = await kontenbase.auth.user();

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        user: data.user,
      },
    };
  } catch (error) {
    // console.error(error.message);
    return { props: { user: null } };
  }
};
