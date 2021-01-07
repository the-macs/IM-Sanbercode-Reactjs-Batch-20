import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import { StarFilled } from "@ant-design/icons";

import { MorevContext } from "./Context";

import { Layout, Divider, Card, Row, Col, Modal } from "antd";

import heroImage from "./image/hero-image.jpg";

const { Meta } = Card;

const Home = () => {
  const [games, setGames, movie, setMovie] = useContext(MorevContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  useEffect(() => {
    if (
      games.dataGames === null ||
      movie.dataMovie === null ||
      games.isSearch ||
      movie.isSearch
    ) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-game`)
        .then((res) => {
          let data = res.data;
          setGames({
            ...games,
            isSearch: false,
            dataGames: data,
          });
        });

      axios
        .get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then((res) => {
          let data = res.data;
          setMovie({
            ...movie,
            isSearch: false,
            dataMovie: data,
          });
        });
    }
  });

  const mDetail = (id, type) => {
    let data = "";
    type === "movies" ? (data = movie.dataMovie) : (data = games.dataGames);
    setDataModal({
      type: type,
      data: data.find((el) => el.id === id),
    });

    setModalVisible(true);
  };

  return (
    <>
      <div className="hero-image">
        <img src={heroImage} alt="Banner" />
      </div>
      {/* Movies Section */}
      <Divider>
        <div className="divider">Latest Movies</div>
      </Divider>
      <Layout className="gm-section">
        <Row justify="center" gutter={[12, 24]}>
          {movie.dataMovie !== null &&
            movie.dataMovie.slice(0, 4).map((el, i) => {
              return (
                <Col xs={12} md={6} lg={6} key={i}>
                  <Card
                    className="gm-card"
                    cover={<img alt={el.title} src={el.image_url} />}
                    onClick={() => mDetail(el.id, "movies")}
                  >
                    <Row>
                      <Col xs={18} md={20} lg={20} span={20}>
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

      {/* Games Section */}
      <Divider>
        <div className="divider">Latest Games</div>
      </Divider>
      <Layout className="gm-section">
        <Row justify="center" gutter={[12, 12]}>
          {games.dataGames !== null &&
            games.dataGames.slice(0, 4).map((el, i) => {
              return (
                <Col xs={12} md={6} lg={6} key={i}>
                  <Card
                    className="gm-card"
                    cover={<img alt={el.name} src={el.image_url} />}
                    onClick={() => mDetail(el.id, "games")}
                  >
                    <Meta className="gm-card-meta" description={el.name} />
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
            {dataModal.type === "games" ? (
              <Row>
                <Col xs={24} md={12} lg={12}>
                  <img
                    src={dataModal.data.image_url}
                    alt={dataModal.data.name}
                    width={"100%"}
                  />
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <div className="modal-content">
                    <div className="modal-title">{dataModal.data.name}</div>
                    <Divider />
                    <div className="modal-description">
                      <strong>Genre : </strong> {dataModal.data.genre} <br />
                      <strong>Singleplayer : </strong>
                      {dataModal.data.singlePlayer === 1 ? "Yes" : "No"} <br />
                      <strong>Multiplayer : </strong>
                      {dataModal.data.multiplayer === 1 ? "Yes" : "No"} <br />
                      <strong>Platform : </strong> {dataModal.data.platform}
                      <br />
                      <strong>Release : </strong> {dataModal.data.release}
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={24} md={12} lg={12}>
                  <img
                    src={dataModal.data.image_url}
                    alt={dataModal.data.title}
                    width={"100%"}
                  />
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <div className="modal-content">
                    <div className="modal-title">{dataModal.data.title}</div>
                    <Divider />
                    <div className="modal-description">
                      <strong>Year : </strong> {dataModal.data.year} <br />
                      <strong>Duration : </strong> {dataModal.data.duration}{" "}
                      <br />
                      <strong>Genre : </strong> {dataModal.data.genre} <br />
                      <strong>Rating : </strong> {dataModal.data.rating} <br />
                      <strong>Review : </strong> {dataModal.data.review} <br />
                      <strong>Description : </strong>{" "}
                      {dataModal.data.description}
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Layout>
        </Modal>
      )}
    </>
  );
};

export default Home;
