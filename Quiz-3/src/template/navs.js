import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Home from "./../module/home";
import About from "./../module/about";
import Login from "./../module/login";
import ListEditor from "./../module/ListEditor";

import { BookContext } from "./../module/context";

import logo from "./../assets/logo.png";

const Navs = () => {
  const [book, setBook, isLogin, setIsLogin] = useContext(BookContext);
  const HandleLogout = () => {
    setIsLogin("false");
    localStorage.removeItem("isLogin");
    return <Redirect to={"/about"} />;
  };

  return (
    <Router>
      <header>
        <img id="logo" src={logo} width="200px" alt="Logo Sanber" />
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {isLogin == "true" ? (
              <>
                <li>
                  <Link to="/list-editor">Books List Editor</Link>
                </li>
                <li>
                  <a onClick={HandleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/list-editor" component={ListEditor} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Navs;
