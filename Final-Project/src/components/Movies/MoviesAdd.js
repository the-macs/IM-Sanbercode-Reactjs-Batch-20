import React from "react";
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
  Rate,
  Checkbox,
  Space,
} from "antd";

class MovieAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxOption: [
        { label: "Action", value: "Action" },
        { label: "Adventure", value: "Adventure" },
        { label: "Animation", value: "Animation" },
        { label: "Comedy", value: "Comedy" },
        { label: "Drama", value: "Drama" },
        { label: "Fantasy", value: "Fantasy" },
        { label: "Horor", value: "Horor" },
        { label: "Romance", value: "Romance" },
        { label: "Sci-fi", value: "Sci-fi" },
      ],
      input: {
        title: "",
        year: "",
        duration: "",
        rating: "",
        genre: "",
        imageUrl: "",
        description: "",
        review: "",
      },
      userToken: JSON.parse(localStorage.getItem("user")).token,
      redirect: null,
    };
  }

  // Handle Submit
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://backendexample.sanbersy.com/api/data-movie", {
        title: this.state.input.title,
        year: parseInt(this.state.input.year),
        duration: parseInt(this.state.input.duration),
        rating: parseInt(this.state.input.rating),
        genre: this.state.input.genre.toString(),
        image_url: this.state.input.imageUrl,
        description: this.state.input.description,
        review: this.state.input.review,
        token: this.state.userToken,
      })
      .then(() => {
        notification.success({
          message: "Sucess Add New Movie.",
        });
        this.setState({
          input: {
            title: "",
            year: "",
            duration: "",
            rating: "",
            genre: [],
            imageUrl: "",
            description: "",
            review: "",
          },
        });
        this.props.history.push("/movies-editor");
      })
      .catch((err) => {
        notification.error({
          message: "Failed Add New Movie.",
        });
      });
  };

  // Handle Change
  handleChange = (e) => {
    let value = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "title": {
        this.setState({
          input: {
            ...this.state.input,
            title: value,
          },
        });
        break;
      }
      case "imageUrl": {
        this.setState({
          input: {
            ...this.state.input,
            imageUrl: value,
          },
        });
        break;
      }
      case "description": {
        this.setState({
          input: {
            ...this.state.input,
            description: value.replace(/'/g, "\\'"),
          },
        });
        break;
      }
      case "review": {
        this.setState({
          input: {
            ...this.state.input,
            review: value.replace(/'/g, "\\'"),
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  handleChangeCustom = (name) => (value) => {
    switch (name) {
      case "year": {
        this.setState({
          input: {
            ...this.state.input,
            year: value,
          },
        });
        break;
      }
      case "duration": {
        this.setState({
          input: {
            ...this.state.input,
            duration: value,
          },
        });
        break;
      }
      case "rating": {
        this.setState({
          input: {
            ...this.state.input,
            rating: value * 2,
          },
        });
        break;
      }
      case "genre": {
        this.setState({
          input: {
            ...this.state.input,
            genre: value,
          },
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  render = () => {
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
                    src={
                      "https://images.unsplash.com/photo-1583952323306-b64d60133a89?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80"
                    }
                    alt="Sample Movie"
                    className="m-smp-img"
                  />
                </Col>
                <Col span={12}>
                  <div className="m-form-right">
                    <Form layout="vertical" onSubmitCapture={this.handleSubmit}>
                      <Form.Item label="Title" required>
                        <Input
                          placeholder="Title"
                          name="title"
                          value={this.state.input.title}
                          onChange={this.handleChange}
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
                            value={this.state.input.year}
                            onChange={this.handleChangeCustom("year")}
                            required
                          />
                        </Form.Item>
                        <Form.Item label="Duration" required>
                          <InputNumber
                            placeholder="Duration"
                            type="number"
                            name="duration"
                            pattern="[0-9]{1,5}"
                            value={this.state.input.duration}
                            onChange={this.handleChangeCustom("duration")}
                            required
                          />
                        </Form.Item>
                      </Space>
                      <Form.Item label="Rating" required>
                        <Rate
                          allowHalf
                          name="rating"
                          value={this.state.input.rating / 2}
                          onChange={this.handleChangeCustom("rating")}
                          required
                        />
                      </Form.Item>
                      <Form.Item label="Genre" required>
                        <Checkbox.Group
                          options={this.state.checkboxOption}
                          name="genre"
                          value={this.state.input.genre}
                          onChange={this.handleChangeCustom("genre")}
                        />
                      </Form.Item>
                      <Form.Item label="Image URL" required>
                        <Input
                          placeholder="Image URL"
                          name="imageUrl"
                          value={this.state.input.imageUrl}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Item>
                      <Form.Item label="Description" required>
                        <Input.TextArea
                          placeholder="Description"
                          name="description"
                          rows={10}
                          value={this.state.input.description}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Item>
                      <Form.Item label="Review" required>
                        <Input.TextArea
                          placeholder="Review"
                          name="review"
                          value={this.state.input.review}
                          onChange={this.handleChange}
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
}

export default MovieAdd;
