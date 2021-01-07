import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useHistory } from "react-router-dom";

import {
  Layout,
  Row,
  Col,
  Input,
  notification,
  Divider,
  Form,
  InputNumber,
  Rate,
  Checkbox,
  Space,
} from "antd";

const MovieAdd = () => {
  const { id } = useParams();
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  const history = useHistory();
  const [input, setInput] = useState({
    title: "",
    year: "",
    duration: "",
    rating: "",
    genre: "",
    image_url: "",
    description: "",
    review: "",
  });
  const checkboxOption = [
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "Animation", value: "Animation" },
    { label: "Comedy", value: "Comedy" },
    { label: "Drama", value: "Drama" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Horor", value: "Horor" },
    { label: "Romance", value: "Romance" },
    { label: "Sci-fi", value: "Sci-fi" },
  ];

  useEffect(() => {
    if (input.title === "") {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
        .then((res) => {
          let data = res.data;
          setInput({
            ...data,
            genre: data.genre.split(","),
          });
        });
    }
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
        title: input.title,
        year: parseInt(input.year),
        duration: parseInt(input.duration),
        rating: parseInt(input.rating),
        genre: input.genre.toString(),
        image_url: input.image_url,
        description: input.description,
        review: input.review,
        token: userToken,
      })
      .then(() => {
        notification.success({
          message: "Sucess Update Movies.",
        });
        setInput({
          title: "",
          year: "",
          duration: "",
          rating: "",
          genre: [],
          image_url: "",
          description: "",
          review: "",
        });
        history.push("/movies-editor");
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
      case "title": {
        setInput({
          ...input,
          title: value,
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
      case "description": {
        setInput({
          ...input,
          description: value.replace(/'/g, "\\'"),
        });
        break;
      }
      case "review": {
        setInput({
          ...input,
          review: value.replace(/'/g, "\\'"),
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
      case "year": {
        setInput({
          ...input,
          year: value,
        });
        break;
      }
      case "duration": {
        setInput({
          ...input,
          duration: value,
        });
        break;
      }
      case "rating": {
        setInput({
          ...input,
          rating: value * 2,
        });
        break;
      }
      case "genre": {
        setInput({
          ...input,
          genre: value,
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
        <div className="divider">Add New Movies</div>
      </Divider>
      <Layout className="m-form">
        <Row justify="center" gutter={[12, 12]}>
          <Layout>
            <Row>
              <Col span={12}>
                <img
                  src={input.image_url}
                  alt="Sample Movie"
                  className="m-smp-img"
                />
              </Col>
              <Col span={12}>
                <div className="m-form-right">
                  <Form layout="vertical" onSubmitCapture={handleSubmit}>
                    <Form.Item label="Title" required>
                      <Input
                        placeholder="Title"
                        name="title"
                        value={input.title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Item>
                    <Space size={24}>
                      <Form.Item label="Year" required>
                        <InputNumber
                          placeholder="Year"
                          type="number"
                          name="year"
                          pattern="[0-9]{1,5}"
                          value={input.year}
                          onChange={handleChangeCustom("year")}
                          required
                        />
                      </Form.Item>
                      <Form.Item label="Duration" required>
                        <InputNumber
                          placeholder="Duration"
                          type="number"
                          name="duration"
                          pattern="[0-9]{1,5}"
                          value={input.duration}
                          onChange={handleChangeCustom("duration")}
                          required
                        />
                      </Form.Item>
                    </Space>
                    <Form.Item label="Rating" required>
                      <Rate
                        allowHalf
                        name="rating"
                        value={input.rating / 2}
                        onChange={handleChangeCustom("rating")}
                        required
                      />
                    </Form.Item>
                    <Form.Item label="Genre" required>
                      <Checkbox.Group
                        options={checkboxOption}
                        name="genre"
                        value={input.genre}
                        onChange={handleChangeCustom("genre")}
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
                    <Form.Item label="Description" required>
                      <Input.TextArea
                        placeholder="Description"
                        name="description"
                        rows={10}
                        value={input.description}
                        onChange={handleChange}
                        required
                      />
                    </Form.Item>
                    <Form.Item label="Review" required>
                      <Input.TextArea
                        placeholder="Review"
                        name="review"
                        value={input.review}
                        onChange={handleChange}
                        required
                      />
                    </Form.Item>
                    <div className="m-form-submit">
                      <button type="submit" className="m-form-button">
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

export default MovieAdd;
