import React from "react";

let dataHargaBuah = [
  { nama: "Semangka", harga: 10000, berat: 1000 },
  { nama: "Anggur", harga: 40000, berat: 500 },
  { nama: "Strawberry", harga: 30000, berat: 400 },
  { nama: "Jeruk", harga: 30000, berat: 1000 },
  { nama: "Mangga", harga: 30000, berat: 500 },
];

class ListHargaBuah extends React.Component {
  render() {
    return (
      <>
        <h1
          style={{
            backgroundColor: "turquoise",
            padding: "5px 0",
            marginTop: "0px",
          }}
        >
          TUGAS-11
        </h1>
        <h2>Table Harga Buah</h2>
        <table border="1" id="tugas10">
          <thead>
            <tr style={{ backgroundColor: "grey" }}>
              <th>Nama</th>
              <th>Harga</th>
              <th>Berat</th>
            </tr>
          </thead>
          <tbody>
            {dataHargaBuah.map((el, i) => {
              return (
                <tr key={i}>
                  <td>{el.nama}</td>
                  <td>{el.harga}</td>
                  <td>{el.berat / 1000} kg</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default ListHargaBuah;
