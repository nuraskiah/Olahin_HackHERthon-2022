import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  // state
  const [user, setUser] = useState({});
  const [token, setToken] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { children } = props;
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
