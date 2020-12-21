// import logo from "./logo.svg";
import "./App.css";
import FormBuah from "./Tugas-9/tugas9";
import ListHargaBuah from "./Tugas-10/tugas10";
import TimeCountdown from "./Tugas-11/timeCountdown";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <FormBuah />
      <ListHargaBuah />
      <TimeCountdown start={100} />
    </div>
  );
}

export default App;
