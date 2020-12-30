import React, { useState, createContext } from "react";

export const BookContext = createContext();

export const BookProvider = (props) => {
  const isLog = localStorage.getItem("isLogin");

  const [book, setBook] = useState(null);
  const [isLogin, setIsLogin] = useState(isLog);

  return (
    <BookContext.Provider value={[book, setBook, isLogin, setIsLogin]}>
      {props.children}
    </BookContext.Provider>
  );
};
