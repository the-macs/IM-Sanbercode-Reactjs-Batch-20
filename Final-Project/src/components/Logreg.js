import React, { useContext, useState } from "react";
import axios from "axios";

import "./style/logreg.css";

import { Layout, Row, Col, Tabs, Input, Space, notification } from "antd";

import { MorevContext } from "./Context";

import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const Logreg = () => {
  const [, , , , , setUser] = useContext(MorevContext);
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const [inputRegister, setInputRegister] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const openNotification = (mess) => {
    notification.error({
      message: mess,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://backendexample.sanbersy.com/api/user-login", {
        email: inputLogin.email,
        password: inputLogin.password,
      })
      .then((res) => {
        var user = res.data.user;
        var token = res.data.token;
        var currentUser = { name: user.name, email: user.email, token };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      })
      .catch((err) => {
        openNotification("Please check your username or password");
      });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (inputRegister.password !== inputRegister.cpassword) {
      openNotification("Password does not same with confirmation");
      // console.log(`anjay`);
    } else {
      axios
        .post("https://backendexample.sanbersy.com/api/register", {
          name: inputRegister.name,
          email: inputRegister.email,
          password: inputRegister.password,
        })
        .then((res) => {
          var user = res.data.user;
          var token = res.data.token;
          var currentUser = { name: user.name, email: user.email, token };
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        })
        .catch((err) => {
          openNotification(JSON.parse(err.response.data).email[0]);
        });
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "emailLogin": {
        setInputLogin({ ...inputLogin, email: value });
        break;
      }
      case "passwordLogin": {
        setInputLogin({ ...inputLogin, password: value });
        break;
      }
      case "nameRegister": {
        setInputRegister({ ...inputRegister, name: value });
        break;
      }
      case "emailRegister": {
        setInputRegister({ ...inputRegister, email: value });
        break;
      }
      case "passwordRegister": {
        setInputRegister({ ...inputRegister, password: value });
        break;
      }
      case "cpasswordRegister": {
        setInputRegister({ ...inputRegister, cpassword: value });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Layout className="lr-section">
      <Row justify="center" className="lr-row" gutter={[12, 12]}>
        <Tabs defaultActiveKey="1" className="lr-tab">
          <TabPane tab="Login" key="1">
            <Layout>
              <Row>
                <Col span={24}>
                  <form onSubmit={handleSubmitLogin}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="E-Mail"
                        name="emailLogin"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={handleChange}
                        value={inputLogin.email}
                        prefix={<MailOutlined />}
                        required
                      />
                      <Input.Password
                        placeholder="Password"
                        name="passwordLogin"
                        onChange={handleChange}
                        value={inputLogin.password}
                        prefix={<LockOutlined />}
                        required
                      />

                      <button type="submit" className="lg-btn">
                        Login
                      </button>
                    </Space>
                  </form>
                </Col>
              </Row>
            </Layout>
          </TabPane>
          <TabPane tab="Register" key="2">
            <Layout>
              <Row>
                <Col span={24}>
                  <form onSubmit={handleSubmitRegister}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Name"
                        name="nameRegister"
                        onChange={handleChange}
                        value={inputRegister.name}
                        prefix={<UserOutlined />}
                      />
                      <Input
                        placeholder="E-Mail"
                        name="emailRegister"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        onChange={handleChange}
                        value={inputRegister.email}
                        prefix={<MailOutlined />}
                      />
                      <Input.Password
                        placeholder="Password"
                        name="passwordRegister"
                        onChange={handleChange}
                        value={inputRegister.password}
                        prefix={<LockOutlined />}
                      />
                      <Input.Password
                        placeholder="Confirm Password"
                        name="cpasswordRegister"
                        onChange={handleChange}
                        value={inputRegister.cpassword}
                        prefix={<LockOutlined />}
                      />
                      <button type="submit" className="lg-btn">
                        Register
                      </button>
                    </Space>
                  </form>
                </Col>
              </Row>
            </Layout>
          </TabPane>
        </Tabs>
      </Row>
      {/* <Row justify="center" className="lr-row" gutter={[12, 12]}></Row> */}
    </Layout>
  );
};

export default Logreg;
