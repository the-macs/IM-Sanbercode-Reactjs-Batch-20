import React, { useState, createContext } from "react";

export const MorevContext = createContext();

export const MorevProvider = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const iniateUser = currentUser ? currentUser : null;
  const [user, setUser] = useState(iniateUser);

  const [games, setGames] = useState({
    dataGames: null,
    isSearch: false,
  });

  const [movie, setMovie] = useState({
    dataMovie: null,
    isSearch: false,
  });
  //   const [isLogin, setIsLogin] = useState(isLog);

  return (
    <MorevContext.Provider
      value={[games, setGames, movie, setMovie, user, setUser]}
    >
      {props.children}
    </MorevContext.Provider>
  );
};
