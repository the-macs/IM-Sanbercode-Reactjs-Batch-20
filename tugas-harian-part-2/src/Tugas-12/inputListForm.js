import React from "react";

const numberFormat = (value) =>
  new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

class InputListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHargaBuah: [
        { nama: "Semangka", harga: 10000, berat: 1000 },
        { nama: "Anggur", harga: 40000, berat: 500 },
        { nama: "Strawberry", harga: 30000, berat: 400 },
        { nama: "Jeruk", harga: 30000, berat: 1000 },
        { nama: "Mangga", harga: 30000, berat: 500 },
      ],
      newInput: {
        nama: "",
        harga: "",
        berat: "",
      },
      currentIndex: -1,
      clock: new Date().toLocaleTimeString(),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let currentIndex = this.state.currentIndex;
    let dataBuah = this.state.dataHargaBuah;
    let newInput = this.state.newInput;
    if (currentIndex === -1) {
      this.setState({
        dataHargaBuah: [...dataBuah, newInput],
      });
    } else {
      dataBuah[currentIndex] = newInput;
      this.setState({
        currentIndex: -1,
      });
    }

    this.setState({
      newInput: {
        nama: "",
        harga: "",
        berat: "",
      },
    });
  };

  handleChange = (e) => {
    const newDict = { ...this.state.newInput, [e.target.name]: e.target.value };

    this.setState({
      newInput: newDict,
    });
  };

  handleEdit = (e) => {
    let index = e.target.value;
    let data = this.state.dataHargaBuah[index];

    this.setState({
      newInput: data,
      currentIndex: index,
    });
  };

  handleDelete = (e) => {
    let newData = [...this.state.dataHargaBuah]; // make a separate copy of the array
    let index = e.target.value;
    if (index !== -1) {
      newData.splice(index, 1);
      this.setState({ dataHargaBuah: newData });
    }
  };

  componentDidMount() {
    if (this.props.start !== undefined) {
      this.setState({ time: this.props.start });
    }

    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      clock: new Date().toLocaleTimeString(),
    });
  }

  render = () => {
    return (
      <>
        <h1
          style={{
            backgroundColor: "turquoise",
            padding: "5px 0",
            marginTop: "0px",
          }}
        >
          TUGAS-12
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="grid grid-container-2">
            <div>
              <div className="card">
                <div className="container">
                  <h2 className="card-title">Form Pembelian Buah</h2>
                  <div className="grid-container-2 form-group">
                    <label>Nama Buah</label>
                    <div className="input-form">
                      <input
                        type="text"
                        name="nama"
                        value={this.state.newInput.nama}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid-container-2 form-group">
                    <label>Harga</label>
                    <div className="input-form">
                      <input
                        type="number"
                        name="harga"
                        value={this.state.newInput.harga}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid-container-2 form-group">
                    <label>Berat</label>
                    <div className="input-form">
                      <input
                        type="number"
                        name="berat"
                        value={this.state.newInput.berat}
                        onChange={this.handleChange}
                        required
                      />
                    </div>{" "}
                    <small
                      style={{
                        textAlign: "left",
                        paddingLeft: "10px",
                        paddingTop: "20px",
                      }}
                    >
                      <em>* Satuan berat dalam Gram (gr)</em>
                    </small>
                  </div>
                  <div className="grid-container-1">
                    <button type="submit" className="buttonLong">
                      Proses
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card">
                <div className="container">
                  <h2 className="card-title">Tabel Harga Buah</h2>
                  <div className="grid-container-1 form-table">
                    <table border="1" id="tugas10">
                      <thead>
                        <tr>
                          <th width="5%">No.</th>
                          <th>Nama</th>
                          <th>Harga</th>
                          <th>Berat</th>
                          <th width="12%">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataHargaBuah.map((el, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{el.nama}</td>
                              <td>{numberFormat(el.harga)}</td>
                              <td>{el.berat / 1000} kg</td>
                              <td className="tdAct">
                                <button
                                  type="button"
                                  className="custom-button edit-button"
                                  onClick={this.handleEdit}
                                  value={i}
                                  href="?"
                                >
                                  Ubah
                                </button>
                                <button
                                  type="button"
                                  className="custom-button delete-button"
                                  onClick={this.handleDelete}
                                  value={i}
                                  href="?"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p align="left">
                      <em>Total Data : {this.state.dataHargaBuah.length}</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <footer>
          <h3>Jam Sekarang : {this.state.clock}</h3>
        </footer>
      </>
    );
  };
}

export default InputListForm;
