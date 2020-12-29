import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ThemeContext } from "./ThemeContext";

import FormBuah from "./../Tugas-9/tugas9";
import ListHargaBuah from "./../Tugas-10/tugas10";
import TimeCountdown from "./../Tugas-11/timeCountdown";
import InputListForm from "./../Tugas-12/inputListForm";
import ILFHookAxios from "./../Tugas-13/ILFHookAxios";
import Buah from "./../Tugas-14/Buah";

import logo from "./../assets/logo.png";

const Routes = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const themeChange = () => {
    if (theme == "dark") setTheme("light");
    else if (theme == "light") setTheme("dark");
  };

  const ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Router>
      <header className={theme}>
        <img id="logo" src={logo} width="200px" />
        <nav>
          <ul className={theme}>
            <li>
              <Link to="/">Tugas 9</Link>
            </li>
            <li>
              <Link to="/tugas-10">Tugas 10</Link>
            </li>
            <li>
              <Link to="/tugas-11">Tugas 11</Link>
            </li>
            <li>
              <Link to="/tugas-12">Tugas 12</Link>
            </li>
            <li>
              <Link to="/tugas-13">Tugas 13</Link>
            </li>
            <li>
              <Link to="/tugas-14">Tugas 14</Link>
            </li>
          </ul>
        </nav>

        <button className={`btnTheme btn${theme}`} onClick={themeChange}>
          {ucfirst(theme)}
        </button>
      </header>
      {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/" component={FormBuah} />
        <Route exact path="/tugas-10" component={ListHargaBuah} />
        <Route exact path="/tugas-11">
          <TimeCountdown start={10} />
        </Route>
        <Route exact path="/tugas-12" component={InputListForm} />
        <Route exact path="/tugas-13" component={ILFHookAxios} />
        <Route exact path="/tugas-14" component={Buah} />
      </Switch>
    </Router>
  );
};

export default Routes;
