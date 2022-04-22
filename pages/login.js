import Login from 'containers/auth/login';
import getCookie from 'utils/getCookie';
import { setToken } from 'context/auth';
import { kontenbase } from 'lib/client';

export default Login;

export const getServerSideProps = async (context) => {
  try {
    // const token = getCookie(context.req, 'token');

    // setToken(token);
    const { user, error } = await kontenbase.auth.user();
    if (error) {
      return { props: { user: null } };
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        user,
      },
    };
  } catch (error) {
    // console.error(error.message);
    return { props: { user: null } };
  }
};
