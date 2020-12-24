import React, { useState, useEffect } from "react";
import axios from "axios";

const numberFormat = (value) =>
  new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

const ILFHookAxios = () => {
  const [dataHargaBuah, setdataHargaBuah] = useState(null);
  const [currentId, setcurrentId] = useState(null);
  const [inputName, setinputName] = useState("");
  const [inputPrice, setinputPrice] = useState("");
  const [inputWeight, setinputWeight] = useState("");

  useEffect(() => {
    if (dataHargaBuah == null) {
      axios
        .get(`http://backendexample.sanbercloud.com/api/fruits`)
        .then((res) => {
          let data = res.data;
          setdataHargaBuah(
            data.map((el) => {
              return {
                id: el.id,
                name: el.name,
                price: el.price,
                weight: el.weight,
              };
            })
          );
        });
    }
  });

  const handleChange = (e) => {
    if ([e.target.name] == "name") setinputName(e.target.value);
    else if ([e.target.name] == "price") setinputPrice(e.target.value);
    else if ([e.target.name] == "weight") setinputWeight(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId == null) {
      axios
        .post(`http://backendexample.sanbercloud.com/api/fruits`, {
          name: inputName,
          price: inputPrice,
          weight: inputWeight,
        })
        .then((res) => {
          let data = res.data;
          setdataHargaBuah([
            ...dataHargaBuah,
            {
              id: data.id,
              name: data.name,
              price: data.price,
              weight: data.weight,
            },
          ]);
        });
    } else {
      axios
        .put(`http://backendexample.sanbercloud.com/api/fruits/${currentId}`, {
          name: inputName,
          price: inputPrice,
          weight: inputWeight,
        })
        .then(() => {
          let singleBuah = dataHargaBuah.find((x) => x.id === currentId);
          singleBuah.name = inputName;
          singleBuah.price = inputPrice;
          singleBuah.weight = inputWeight;

          setdataHargaBuah([...dataHargaBuah]);
        });
    }
    setinputName("");
    setinputPrice("");
    setinputWeight("");
  };

  const handleEdit = (e) => {
    let id = e.target.value;
    axios
      .get(`http://backendexample.sanbercloud.com/api/fruits/${id}`)
      .then((res) => {
        let data = res.data;
        setcurrentId(data.id);
        setinputName(data.name);
        setinputPrice(data.price);
        setinputWeight(data.weight);
      });
  };

  const handleDelete = (e) => {
    let id = parseInt(e.target.value);
    axios
      .delete(`http://backendexample.sanbercloud.com/api/fruits/${id}`)
      .then(() => {
        let dataBuah = dataHargaBuah.filter((el) => {
          return el.id !== id;
        });
        setdataHargaBuah([...dataBuah]);
      });
  };

  return (
    <>
      {dataHargaBuah !== null && (
        <>
          <h1
            style={{
              backgroundColor: "turquoise",
              padding: "20px 0",
              marginTop: "0px",
            }}
          >
            TUGAS-12
          </h1>
          <form onSubmit={handleSubmit}>
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
                          name="name"
                          value={inputName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Harga</label>
                      <div className="input-form">
                        <input
                          type="number"
                          name="price"
                          value={inputPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Berat</label>
                      <div className="input-form">
                        <input
                          type="number"
                          name="weight"
                          value={inputWeight}
                          onChange={handleChange}
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
                          {dataHargaBuah.map((el, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{el.name}</td>
                                <td>{numberFormat(el.price)}</td>
                                <td>{el.weight / 1000} kg</td>
                                <td className="tdAct">
                                  <button
                                    type="button"
                                    className="custom-button edit-button"
                                    onClick={handleEdit}
                                    value={el.id}
                                    href="?"
                                  >
                                    Ubah
                                  </button>
                                  <button
                                    type="button"
                                    className="custom-button delete-button"
                                    onClick={handleDelete}
                                    value={el.id}
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
                        <em>Total Data : {dataHargaBuah.length}</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ILFHookAxios;
