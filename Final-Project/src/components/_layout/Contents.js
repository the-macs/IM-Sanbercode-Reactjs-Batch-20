import React, { useContext } from "react";

import BottomBar from "./BottomBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";

import { MorevContext } from "./../Context";

import Home from "./../Home";
import Login from "./../Logreg";

import Games from "./../Games/Games";
import GamesEditor from "./../Games/GamesList";
import GamesAdd from "../Games/GamesAdd";
import GamesEdit from "../Games/GamesEdit";

import Movies from "./../Movies/Movies";
import MoviesEditor from "../Movies/MoviesList";
import MoviesAdd from "../Movies/MoviesAdd";
import MoviesEdit from "../Movies/MoviesEdit";

import ChangePassword from "./../ChangePassword";

const { Content } = Layout;

const Contents = () => {
  const [, , , , user] = useContext(MorevContext);

  const PrivateRoute = ({ user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({ user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />;

  return (
    <>
      <Layout>
        <Layout>
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                height: "100%",
              }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/games" component={Games} />
                {/* <Route exact path="/login" component={Login} /> */}
                <LoginRoute exact path="/login" user={user} component={Login} />

                <PrivateRoute
                  exact
                  path="/games-editor"
                  user={user}
                  component={GamesEditor}
                />
                <PrivateRoute
                  exact
                  path="/games-editor/add"
                  user={user}
                  component={GamesAdd}
                />
                <PrivateRoute
                  exact
                  path="/games-editor/edit/:id"
                  user={user}
                  component={GamesEdit}
                />

                <PrivateRoute
                  exact
                  path="/movies-editor"
                  user={user}
                  component={MoviesEditor}
                />
                <PrivateRoute
                  exact
                  path="/movies-editor/add"
                  user={user}
                  component={MoviesAdd}
                />
                <PrivateRoute
                  exact
                  path="/movies-editor/edit/:id"
                  user={user}
                  component={MoviesEdit}
                />

                <PrivateRoute
                  exact
                  path="/change-password"
                  user={user}
                  component={ChangePassword}
                />
              </Switch>
            </Content>
          </Layout>
          <BottomBar />
        </Layout>
      </Layout>
    </>
  );
};

export default Contents;
