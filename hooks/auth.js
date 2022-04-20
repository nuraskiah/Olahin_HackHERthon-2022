import { useMutation } from 'react-query';
import Cookies from 'js-cookie';
import { kontenbase } from 'lib/client';

const useAuthentication = () => {
  const login = useMutation((body) => kontenbase.auth.login(body));
  const register = useMutation((body) => kontenbase.auth.register(body));

  return {
    login,
    register,
  };
};

const logout = () => {
  Cookies.remove('token');
  localStorage.removeItem('token');
};

export { useAuthentication, logout };
