import React from 'react';
import getCookie from 'utils/getCookie';
import { useUser } from 'context/auth';

import Router, { useRouter } from 'next/router';
import { kontenbase } from 'lib/client';

export default function withAuth(Component) {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const [initializing, setInitializing] = React.useState(false);
    const { setUser, isLoggedIn, setIsLoggedIn } = useUser();

    React.useEffect(() => {
      const func = async () => {
        if (initializing) {
          try {
            const { user, error } = await kontenbase.auth.user();
            if (error) {
              return Router.replace('/login');
            }

            setUser(user);
            setIsLoggedIn(true);
            setInitializing(false);
          } catch (error) {
            Router.replace('/login');
          }
        }
      };

      func();
    }, [initializing]);

    React.useEffect(() => {
      if (!isLoggedIn) {
        setInitializing(true);
      }
    }, []);

    // If user is not logged in, return login component
    if (!isLoggedIn) {
      return <div>Loading</div>;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
