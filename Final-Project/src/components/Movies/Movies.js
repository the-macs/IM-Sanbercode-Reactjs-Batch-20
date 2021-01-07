import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import "./movies.css";

import { StarFilled } from "@ant-design/icons";

import { MorevContext } from "./../Context";

import { Layout, Divider, Card, Row, Col, Modal } from "antd";

const { Meta } = Card;

const Movies = () => {
  const [, , movie, setMovie] = useContext(MorevContext);
  const [inputSearch, setInputSearch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  useEffect(() => {
    if (movie.dataMovie === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then((res) => {
          let data = res.data;
          setMovie({
            ...movie,
            dataMovie: data,
          });
        });
    }
  });

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`https://backendexample.sanbersy.com/api/data-movie`)
      .then((res) => {
        let data = res.data;
        setMovie({
          ...movie,
          dataMovie: data.filter((el) =>
            el.title
              .toString()
              .toLowerCase()
              .includes(inputSearch.toString().toLowerCase())
          ),
          isSearch: true,
        });
      });
  };

  const mDetail = (id) => {
    setDataModal(movie.dataMovie.find((el) => el.id === id));
    setModalVisible(true);
  };

  return (
    <>
      <Divider orientation="left">
        <div className="divider">Movies</div>
      </Divider>
      {/* <Search placeholder="input search text" enterButton /> */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="search"
          name="search"
          pattern=".*\S.*"
          onChange={handleChange}
          placeholder={"Search"}
        />
        <button type="submit" className="search-btn">
          <span>Search</span>
        </button>
      </form>
      <br />
      <Layout className="m-section">
        <Row
          justify="center"
          gutter={[
            { xs: 24, md: 48, lg: 48 },
            { xs: 24, md: 48, lg: 48 },
          ]}
        >
          {movie.dataMovie !== null &&
            movie.dataMovie.map((el, i) => {
              return (
                <Col xs={12} md={6} lg={6} key={i}>
                  <Card
                    className="gm-card"
                    cover={<img alt={el.title} src={el.image_url} />}
                    onClick={() => mDetail(el.id)}
                  >
                    <Row>
                      <Col xs={18} md={20} lg={20}>
                        <Meta className="gm-card-meta" description={el.title} />
                      </Col>
                      <Col xs={6} md={4} lg={4} span={4}>
                        <div className="gm-card-rating">
                          <div className="gm-card-sub-rating">
                            <StarFilled />
                            <br />
                            <span>{el.rating}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Layout>
      {modalVisible && (
        <Modal
          title={false}
          footer={false}
          closable={false}
          centered
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          width={"70%"}
        >
          <Layout>
            <Row>
              <Col xs={24} md={12} lg={12}>
                <img
                  src={dataModal.image_url}
                  alt={dataModal.title}
                  width={"100%"}
                />
              </Col>
              <Col xs={24} md={12} lg={12}>
                <div className="modal-content">
                  <div className="modal-title">{dataModal.title}</div>
                  <Divider />
                  <div className="modal-description">
                    <strong>Year : </strong> {dataModal.year} <br />
                    <strong>Duration : </strong> {dataModal.duration} <br />
                    <strong>Genre : </strong> {dataModal.genre} <br />
                    <strong>Rating : </strong> {dataModal.rating} <br />
                    <strong>Review : </strong> {dataModal.review} <br />
                    <strong>Description : </strong> {dataModal.description}
                  </div>
                </div>
              </Col>
            </Row>
          </Layout>
        </Modal>
      )}
    </>
  );
};

export default Movies;
