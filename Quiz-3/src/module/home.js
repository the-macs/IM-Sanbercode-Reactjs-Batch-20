import React from "react";
import axios from "axios";

const numberFormat = (value) =>
  new Intl.NumberFormat("en-ID", {
    style: "decimal",
    currency: "IDR",
    maximumSignificantDigits: 1,
  }).format(value);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }

  componentDidMount() {
    if (this.state.book === null) {
      axios
        .get(`http://backendexample.sanbercloud.com/api/books`)
        .then((res) => {
          let data = res.data;
          this.setState({
            book: data,
          });
        });
    }
  }

  render = () => (
    <>
      {this.state.book !== null && (
        <>
          <section>
            <h1>Daftar Buku-buku Pilihan</h1>
            <div id="article-list">
              {this.state.book.map((el, i) => {
                return (
                  <div key={i}>
                    <h3 style={{ textAlign: "left" }}>{el.title}</h3>
                    <div className="grid">
                      <div className="grid-container-2">
                        <div style={{ maxWidth: "375px", overflow: "hidden" }}>
                          <img
                            src={el.image_url}
                            alt={el.title}
                            style={{ maxWidth: "initial" }}
                          ></img>
                        </div>
                        <ul>
                          <li>
                            <strong>Tahun Terbit : {el.release_year}</strong>
                          </li>
                          <br />
                          <li>
                            <strong>
                              Harga : Rp. {numberFormat(el.price)}.-
                            </strong>
                          </li>
                          <br />
                          <li>
                            <strong>Jumlah Halaman : {el.totalPage}</strong>
                          </li>
                          <br />
                          <li>
                            <strong>Deskripsi : </strong>
                            {el.description}
                          </li>
                          <br />
                          <li>
                            <strong>Ulasan : </strong>
                            {el.review}
                          </li>
                        </ul>
                      </div>
                    </div>

                    <p></p>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
  );
}

export default Home;
