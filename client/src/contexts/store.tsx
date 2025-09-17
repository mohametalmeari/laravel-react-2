/* eslint-disable react-refresh/only-export-components */
// @ts-nocheck

import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: {},
  setUser: () => {},
  token: null,
  setToken: () => {
    console.log("empty");
  },
});

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);
    console.log(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
