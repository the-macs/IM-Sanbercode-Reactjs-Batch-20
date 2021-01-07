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

const MovieList = () => {
  const [, , movie, setMovie] = useContext(MorevContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const userToken = JSON.parse(localStorage.getItem("user")).token;

  useEffect(() => {
    if (movie.dataMovie === null || movie.isSearch) {
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

  const handleDelete = (id) => {
    axios
      .delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
        token: userToken,
      })
      .then(() => {
        let dataMovie = movie.dataMovie.filter((el) => {
          return el.id !== id;
        });
        setMovie([...dataMovie]);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: "8%",
      ...getColumnSearchProps("year"),
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: "8%",
      ...getColumnSearchProps("duration"),
      sorter: (a, b) => a.duration - b.duration,
      render: (text) => text + ` Minutes`,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: "14%",
      ...getColumnSearchProps("genre"),
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      width: "20%",
      ...getColumnSearchProps("review"),
      render: (text) => (text !== null ? text.substring(1, 50) + ` ...` : text),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      ...getColumnSearchProps("description"),
      render: (text) => (text !== null ? text.substring(1, 50) + ` ...` : text),
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
        <div className="divider">Movies Editor</div>
      </Divider>
      <Layout className="me-table-list">
        <Space direction="vertical" size={24}>
          <Col span={"3"}>
            <Link
              to={(location) => `${location.pathname}/add`}
              className="me-add-btn"
            >
              <PlusSquareOutlined /> Add Movies
            </Link>
          </Col>
          <Col span={"24"}>
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={movie.dataMovie}
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

export default MovieList;
