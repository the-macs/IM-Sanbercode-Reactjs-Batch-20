// import logo from "./logo.svg";
// import "./AppOld.css";
import "./App.css";
import Routes from "./Tugas-15/Router";
import FooterClock from "./FooterClock";
import { ThemeProvider } from "./Tugas-15/ThemeContext";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <ThemeProvider>
        <Routes />
        <FooterClock />
      </ThemeProvider>
    </div>
  );
}

export default App;
