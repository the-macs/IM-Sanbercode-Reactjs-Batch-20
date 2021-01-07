import React, { useEffect, useContext, useState } from "react";
import axios from "axios";

import { MorevContext } from "./../Context";

import { Table, Input, Button, Space, Divider, Col, notification } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import Layout from "antd/lib/layout/layout";

import { Link } from "react-router-dom";

const GamesList = () => {
  const [games, setGames, ,] = useContext(MorevContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const userToken = JSON.parse(localStorage.getItem("user")).token;

  useEffect(() => {
    if (games.dataGames === null || games.isSearch) {
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
    }
  }, [games, setGames]);

  const handleDelete = (id) => {
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
        token: userToken,
      })
      .then(() => {
        let dataGames = games.dataGames.filter((el) => {
          return el.id !== id;
        });
        setGames([...dataGames]);
      })
      .catch((err) => {
        notification.error({
          message: "Failed Add New Movie.",
        });
      });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "8%",
      ...getColumnSearchProps("genre"),
      sorter: (a, b) => a.genre - b.genre,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      width: "8%",
      ...getColumnSearchProps("platform"),
      sorter: (a, b) => a.platform - b.platform,
    },
    {
      title: "Release",
      dataIndex: "release",
      key: "release",
      width: "14%",
      ...getColumnSearchProps("release"),
    },
    {
      title: "Single Player",
      dataIndex: "singlePlayer",
      key: "singlePlayer",
      width: "30%",
      ...getColumnSearchProps("singlePlayer"),
      render: (text) => (text === 1 ? "Yes" : "No"),
    },
    {
      title: "Multi Player",
      dataIndex: "multiplayer",
      key: "multiplayer",
      width: "30%",
      ...getColumnSearchProps("multiplayer"),
      render: (text) => (text === 1 ? "Yes" : "No"),
    },
    {
      title: "Image URL",
      dataIndex: "image_url",
      key: "image_url",
      width: "20%",
      ...getColumnSearchProps("image_url"),
      //   render: (text) => (text !== null ? text.substring(1, 50) + ` ...` : text),
    },
    {
      title: "Act",
      key: "action",
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          <Link to={(location) => `${location.pathname}/edit/${record.id}`}>
            <EditOutlined />
          </Link>

          <div
            className="btn-list"
            value={record.id}
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Divider orientation="left">
        <div className="divider">Games Editor</div>
      </Divider>
      <Layout className="me-table-list">
        <Space direction="vertical" size={24}>
          <Col span={"3"}>
            <Link
              to={(location) => `${location.pathname}/add`}
              className="me-add-btn"
            >
              <PlusSquareOutlined /> Add Games
            </Link>
          </Col>
          <Col span={"24"}>
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={games.dataGames}
              pagination={{
                defaultPageSize: "5",
                pageSizeOptions: ["5", "10", "15"],
                showSizeChanger: true,
                locale: { items_per_page: "" },
              }}
              scroll={{ x: 300 }}
              sticky
            />
          </Col>
        </Space>
      </Layout>
    </>
  );
};

export default GamesList;
