import React, { useContext } from "react";

import logo from "./logo.png";

import { MorevContext } from "./../Context";

import { Link, useLocation, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";

const { SubMenu } = Menu;

const { Header } = Layout;

const menuMap = [
  { key: "1", to: "" },
  { key: "2", to: "movies" },
  { key: "3", to: "games" },
  { key: "4", to: "login" },
  { key: "5", to: "movies-editor" },
  { key: "6", to: "games-editor" },
  { key: "7", to: "change-password" },
  { key: "8", to: "logout" },
];

const Topbar = () => {
  const [, , , , user, setUser] = useContext(MorevContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div>
      <Header className="header" style={{ paddingLeft: "2%" }}>
        <img src={logo} className="logo" alt="Logo Morev" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={
            menuMap.find((el) => el.to === location.pathname.split("/")[1]).key
          }
        >
          <Menu.Item key={"1"}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key={"2"}>
            <Link to="/movies">Movies</Link>
          </Menu.Item>
          <Menu.Item key={"3"}>
            <Link to="/games">Games</Link>
          </Menu.Item>
          {user === null && (
            <Menu.Item key={"4"}>
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
          {user !== null && (
            <>
              <SubMenu
                title={`Hi, ` + user.name}
                key={"99"}
                className="morev-submenu"
              >
                <Menu.Item key={"5"}>
                  <Link to="/movies-editor">Movie Editor</Link>
                </Menu.Item>
                <Menu.Item key={"6"}>
                  <Link to="/games-editor">Games Editor</Link>
                </Menu.Item>
                <Menu.Item key={"7"}>
                  <Link to="/change-password">Change Password</Link>
                </Menu.Item>
                <Menu.Item key={"8"}>
                  <button
                    style={{
                      cursor: "pointer",
                      background: "none",
                      width: "100%",
                      textAlign: "left",
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Menu.Item>
              </SubMenu>
            </>
          )}
        </Menu>
      </Header>
    </div>
  );
};

export default Topbar;
