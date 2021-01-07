import "./App.css";
import "./components/style/layout.css";
import "./components/style/card.css";
import "./components/style/search.css";
import "antd/dist/antd.css";

import { MorevProvider } from "./components/Context";

import { BrowserRouter as Router } from "react-router-dom";

import Topbar from "./components/_layout/Topbar";
import Contents from "./components/_layout/Contents";

import { Layout } from "antd";

function App() {
  return (
    <MorevProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <Topbar />
          <Contents />
        </Router>
      </Layout>
    </MorevProvider>
  );
}

export default App;
