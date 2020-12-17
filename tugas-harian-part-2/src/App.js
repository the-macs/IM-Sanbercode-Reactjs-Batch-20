import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form action="#" method="post">
          <table width="40%" border="1" style={{ margin: "20px" }}>
            <tr>
              <td style={{ border: 0 }}>
                <table width="100%" border="0">
                  <tr>
                    <td colspan="2" style={{ textAlign: "center" }}>
                      <h1>Form Pembelian Buah</h1>
                    </td>
                  </tr>
                  <tr>
                    <th width="50%">Nama Pelanggan</th>
                    <td width="100%">
                      <input type="text"></input>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ verticalAlign: "bottom" }}>Daftar Item</th>
                    <td width="100%">
                      <input type="checkbox" id="radio" name="radio1" />
                      Semangka
                      <br></br>
                      <input type="checkbox" id="radio" name="radio1" />
                      Jeruk
                      <br></br>
                      <input type="checkbox" id="radio" name="radio1" />
                      Nanas
                      <br></br>
                      <input type="checkbox" id="radio" name="radio1" />
                      Salak
                      <br></br>
                      <input type="checkbox" id="radio" name="radio1" />
                      Anggur
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <button type="submit" style={{ borderRadius: "20px" }}>
                        Kirim
                      </button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </form>
      </header>{" "}
    </div>
  );
}

export default App;
