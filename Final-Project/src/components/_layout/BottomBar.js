import React from "react";
import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";

const { Footer } = Layout;

const BottomBar = () => {
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        Morev &copy; Created By{" "}
        <a href={"https://esahadistra.com"} target="_blank" rel="noreferrer">
          <strong>Esa Hadistra</strong>&nbsp;
          <HeartFilled />
        </a>
      </Footer>
    </>
  );
};

export default BottomBar;
