import React, { useContext, useState } from "react";
import axios from "axios";

import "./style/logreg.css";

import { Layout, Row, Col, Tabs, Input, Space, notification } from "antd";

import { MorevContext } from "./Context";

import { LockOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const ChangePassword = () => {
  const [, , , , user, setUser] = useContext(MorevContext);

  const [input, setInput] = useState({
    password: "",
    newPassword: "",
    cNewPassword: "",
  });

  const openNotification = (mess) => {
    notification.error({
      message: mess,
    });
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (input.newPassword !== input.cNewPassword) {
      openNotification("Password does not same with confirmation");
    } else {
      axios
        .post("https://backendexample.sanbersy.com/api/change-password", {
          current_password: input.password,
          new_password: input.newPassword,
          new_confirm_password: input.cNewPassword,
          token: user.token,
        })
        .then(() => {
          setUser(null);
          localStorage.removeItem("user");
        })
        .catch((err) => {
          if (err.response !== undefined)
            openNotification(JSON.parse(err.response.data).current_password[0]);
        });
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
      case "newPassword": {
        setInput({ ...input, newPassword: value });
        break;
      }
      case "cNewPassword": {
        setInput({ ...input, cNewPassword: value });
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
          <TabPane tab="Change Password" key="1">
            <Layout>
              <Row>
                <Col span={24}>
                  <form onSubmit={handleSubmitRegister}>
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <Input.Password
                        placeholder="Current Password"
                        name="password"
                        onChange={handleChange}
                        value={input.password}
                        prefix={<LockOutlined />}
                        required
                      />
                      <Input.Password
                        placeholder="New Password"
                        name="newPassword"
                        onChange={handleChange}
                        value={input.newPassword}
                        prefix={<LockOutlined />}
                        required
                      />
                      <Input.Password
                        placeholder="Confirm New Password"
                        name="cNewPassword"
                        onChange={handleChange}
                        value={input.cNewPassword}
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
        </Tabs>
      </Row>
      {/* <Row justify="center" className="lr-row" gutter={[12, 12]}></Row> */}
    </Layout>
  );
};

export default ChangePassword;
