import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { BookContext } from "./context";

const Home = () => {
  const [book, setBook, isLogin, setIsLogin] = useContext(BookContext);
  let [login, setLogin] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();

  const handleChange = (e) => {
    if (String([e.target.name]) === "username")
      setLogin({ ...login, username: e.target.value });
    else if (String([e.target.name]) === "password")
      setLogin({ ...login, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login.username === "admin" && login.password === "admin") {
      setIsLogin("true");
      localStorage.setItem("isLogin", "true");
      history.push("/");
    } else {
      alert("Username dan Password Gagal");
    }
  };
  return (
    <>
      <section>
        <div id="article-list" style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit}>
            <label>Username : </label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
            />
            <br />
            <label>Password : </label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
            <br />
            <button type="submit" className="buttonLong">
              Login
            </button>
          </form>
        </div>
      </section>

      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
  );
};

export default Home;
