import "./App.css";
import Navs from "./template/navs";
import { BookProvider } from "./module/context";

let isLog = localStorage.getItem("isLogin");
if (!isLog) localStorage.setItem("isLogin", "false");

function App() {
  return (
    <div className="App">
      <BookProvider>
        <Navs />
      </BookProvider>
    </div>
  );
}

export default App;
