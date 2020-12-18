import React from "react";

class FormBuah extends React.Component {
  render() {
    return (
      <>
        <h1>TUGAS-9</h1>
        <form>
          <table border="1" id="tugas9">
            <tr>
              <td style={{ border: 0 }}>
                <table border="0" id="tugas9-inner">
                  <tr>
                    <td colspan="2" style={{ textAlign: "center" }}>
                      <h2>Form Pembelian Buah</h2>
                    </td>
                  </tr>
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
                    <td colspan="2">
                      <button type="submit">Kirim</button>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </form>
      </>
    );
  }
}

export default FormBuah;
