import React from "react";

class FormBuah extends React.Component {
  render() {
    return (
      <>
        <h1>TUGAS-9</h1>
        <form>
          <table border="1" id="tugas9">
            <tbody>
              <tr>
                <td style={{ border: 0 }}>
                  <table border="0" id="tugas9-inner">
                    <thead>
                      <tr>
                        <td colSpan="2" style={{ textAlign: "center" }}>
                          <h2>Form Pembelian Buah</h2>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th width="50%">Nama Pelanggan</th>
                        <td width="100%">
                          <input type="text" />
                        </td>
                      </tr>
                      <tr>
                        <th style={{ verticalAlign: "bottom" }}>Daftar Item</th>
                        <td width="100%">
                          <input type="checkbox" id="radio" name="radio1" />
                          Semangka
                          <br />
                          <input type="checkbox" id="radio" name="radio1" />
                          Jeruk
                          <br />
                          <input type="checkbox" id="radio" name="radio1" />
                          Nanas
                          <br />
                          <input type="checkbox" id="radio" name="radio1" />
                          Salak
                          <br />
                          <input type="checkbox" id="radio" name="radio1" />
                          Anggur
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <button type="submit">Kirim</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </>
    );
  }
}

export default FormBuah;
