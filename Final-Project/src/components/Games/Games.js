import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import "./games.css";
import "./../style/modal.css";

import { MorevContext } from "./../Context";

import { Layout, Divider, Card, Row, Col, Modal } from "antd";

const { Meta } = Card;

const Games = () => {
  const [games, setGames, ,] = useContext(MorevContext);
  const [inputSearch, setInputSearch] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  useEffect(() => {
    if (games.dataGames === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-game`)
        .then((res) => {
          let data = res.data;
          setGames({
            ...games,
            dataGames: data,
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
      .get(`https://backendexample.sanbersy.com/api/data-game`)
      .then((res) => {
        let data = res.data;
        setGames({
          dataGames: data.filter((el) =>
            el.name
              .toString()
              .toLowerCase()
              .includes(inputSearch.toString().toLowerCase())
          ),
          isSearch: true,
        });
      });
  };

  const mDetail = (id) => {
    setDataModal(games.dataGames.find((el) => el.id === id));
    setModalVisible(true);
  };

  return (
    <>
      <Divider orientation="left">
        <div className="divider">Games</div>
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
          {games.dataGames !== null &&
            games.dataGames.map((el, i) => {
              return (
                <Col xs={12} md={6} lg={6} key={i}>
                  <Card
                    className="gm-card"
                    cover={<img alt={el.name} src={el.image_url} />}
                    onClick={() => mDetail(el.id)}
                  >
                    <Row>
                      <Col xs={18} md={20} lg={20}>
                        <Meta className="gm-card-meta" description={el.name} />
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
                  alt={dataModal.name}
                  width={"100%"}
                />
              </Col>
              <Col xs={24} md={12} lg={12}>
                <div className="modal-content">
                  <div className="modal-title">{dataModal.name}</div>
                  <Divider />
                  <div className="modal-description">
                    <strong>Genre : </strong> {dataModal.genre} <br />
                    <strong>Singleplayer : </strong>
                    {dataModal.singlePlayer === 1 ? "Yes" : "No"} <br />
                    <strong>Multiplayer : </strong>
                    {dataModal.multiplayer === 1 ? "Yes" : "No"} <br />
                    <strong>Platform : </strong> {dataModal.platform} <br />
                    <strong>Release : </strong> {dataModal.release} <br />
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

export default Games;
