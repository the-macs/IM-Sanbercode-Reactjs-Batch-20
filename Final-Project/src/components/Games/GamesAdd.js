import React, { useState } from "react";
import axios from "axios";

import {
  Layout,
  Row,
  Col,
  Input,
  notification,
  Divider,
  Form,
  InputNumber,
  Checkbox,
  Space,
} from "antd";
import { useHistory } from "react-router";

const GamesAdd = () => {
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    release: "",
    image_url: "",
  });

  const checkboxPlatform = [
    { label: "PlayStation 3", value: "PlayStation 3" },
    { label: "PlayStation 4", value: "PlayStation 4" },
    { label: "PlayStation 5", value: "PlayStation 5" },
    { label: "Xbox 360", value: "Xbox 360" },
    { label: "Xbox One", value: "Xbox One" },
    { label: "Xbox Series X", value: "Xbox X" },
    { label: "Nintendo Switch", value: "Nintendo Switch" },
    { label: "Microsoft Windows", value: "Microsoft Windows" },
    { label: "MacOS", value: "MacOS" },
    { label: "Mobile", value: "Mobile" },
  ];

  const checkboxGenre = [
    { label: "Action", value: "Action" },
    { label: "Action-adventure", value: "Action-adventure" },
    { label: "Adventure", value: "Adventure" },
    { label: "Role-playing", value: "Role-playing" },
    { label: "Simulation", value: "Simulation" },
    { label: "Strategy", value: "Strategy" },
    { label: "Sports", value: "Sports" },
    { label: "MMO", value: "MMO" },
    { label: "Platform", value: "Platform" },
    { label: "Battle Royale", value: "Battle Royale" },
    { label: "Horor", value: "Horor" },
  ];

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://backendexample.sanbersy.com/api/data-game", {
        name: input.name,
        genre: input.genre.toString(),
        singlePlayer: input.singlePlayer,
        multiplayer: input.multiplayer,
        platform: input.platform.toString(),
        release: input.release,
        image_url: input.image_url,
        token: userToken,
      })
      .then(() => {
        notification.success({
          message: "Sucess Add New Movie.",
        });
        setInput({
          name: "",
          genre: "",
          singlePlayer: 0,
          multiplayer: 0,
          platform: "",
          release: "",
          image_url: "",
        });
        history.push("/games-editor");
      })
      .catch((err) => {
        notification.error({
          message: "Failed Add New Movie.",
        });
      });
  };

  // Handle Change
  const handleChange = (e) => {
    let value = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "name": {
        setInput({
          ...input,
          name: value,
        });
        break;
      }
      case "image_url": {
        setInput({
          ...input,
          image_url: value,
        });
        break;
      }
      case "singlePlayer": {
        setInput({
          ...input,
          singlePlayer: e.target.checked ? 1 : 0,
        });
        break;
      }
      case "multiplayer": {
        setInput({
          ...input,
          multiplayer: e.target.checked ? 1 : 0,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleChangeCustom = (name) => (value) => {
    switch (name) {
      case "genre": {
        setInput({
          ...input,
          genre: value,
        });
        break;
      }
      case "platform": {
        setInput({
          ...input,
          platform: value,
        });
        break;
      }
      case "release": {
        setInput({
          ...input,
          release: value,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Divider orientation="left">
        <div className="divider">Add New Games</div>
      </Divider>
      <Layout className="m-form">
        <Row justify="center" gutter={[12, 12]}>
          <Layout>
            <Row>
              <Col span={12}>
                <img
                  src={
                    "https://images.unsplash.com/photo-1583634852966-130c15654305?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1265&q=80"
                  }
                  alt="Sample Movie"
                  className="m-smp-img"
                />
              </Col>
              <Col span={12}>
                <div className="m-form-right">
                  <Form layout="vertical" onSubmitCapture={handleSubmit}>
                    <Form.Item label="Name" required>
                      <Input
                        placeholder="Name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Item>
                    <Space size={48}>
                      <Form.Item label="Release" required>
                        <InputNumber
                          placeholder="Release"
                          type="number"
                          name="release"
                          pattern="[0-9]{1,5}"
                          value={input.release}
                          onChange={handleChangeCustom("release")}
                          required
                        />
                      </Form.Item>
                      <Form.Item label="Game Type" required>
                        <Checkbox
                          name="singlePlayer"
                          onChange={handleChange}
                          checked={input.singlePlayer === 1 ? "checked" : null}
                        >
                          Single Player
                        </Checkbox>
                        <Checkbox
                          name="multiplayer"
                          checked={input.multiplayer === 1 ? "checked" : null}
                          onChange={handleChange}
                        >
                          Multi Player
                        </Checkbox>
                      </Form.Item>
                    </Space>
                    <Form.Item label="Genre" required>
                      <Checkbox.Group
                        options={checkboxGenre}
                        name="genre"
                        value={input.genre}
                        onChange={handleChangeCustom("genre")}
                      />
                    </Form.Item>
                    <Form.Item label="Platform" required>
                      <Checkbox.Group
                        options={checkboxPlatform}
                        name="platform"
                        value={input.platform}
                        onChange={handleChangeCustom("platform")}
                      />
                    </Form.Item>

                    <Form.Item label="Image URL" required>
                      <Input
                        placeholder="Image URL"
                        name="image_url"
                        value={input.image_url}
                        onChange={handleChange}
                        required
                      />
                    </Form.Item>
                    <div className="m-form-submit">
                      <button
                        type="submit"
                        className="m-form-button"
                        name="buttonSubmit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </Layout>
        </Row>
      </Layout>
    </>
  );
};

export default GamesAdd;
