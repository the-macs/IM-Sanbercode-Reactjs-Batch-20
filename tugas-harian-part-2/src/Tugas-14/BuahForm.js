import React, { useEffect, useContext } from "react";
import { BuahContext } from "./BuahContext";
import axios from "axios";

const BuahForm = () => {
  const [buah, setBuah] = useContext(BuahContext);

  useEffect(() => {
    if (buah.currentId !== null && buah.inputName === "") {
      axios
        .get(
          `http://backendexample.sanbercloud.com/api/fruits/${buah.currentId}`
        )
        .then((res) => {
          let data = res.data;
          setBuah({
            ...buah,
            currentId: data.id,
            inputName: data.name,
            inputPrice: data.price,
            inputWeight: data.weight,
          });
        });
    }
  });

  const handleChange = (e) => {
    if (String([e.target.name]) === "name")
      setBuah({ ...buah, inputName: e.target.value });
    else if (String([e.target.name]) === "price")
      setBuah({ ...buah, inputPrice: e.target.value });
    else if (String([e.target.name]) === "weight")
      setBuah({ ...buah, inputWeight: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (buah.currentId === null) {
      axios
        .post(`http://backendexample.sanbercloud.com/api/fruits`, {
          name: buah.inputName,
          price: buah.inputPrice,
          weight: buah.inputWeight,
        })
        .then((res) => {
          let data = res.data;
          setBuah({
            ...buah,
            inputName: "",
            inputPrice: "",
            inputWeight: "",
            dataHargaBuah: [
              ...buah.dataHargaBuah,
              {
                id: data.id,
                name: data.name,
                price: data.price,
                weight: data.weight,
              },
            ],
          });
        });
    } else {
      axios
        .put(
          `http://backendexample.sanbercloud.com/api/fruits/${buah.currentId}`,
          {
            name: buah.inputName,
            price: buah.inputPrice,
            weight: buah.inputWeight,
          }
        )
        .then(() => {
          let singleBuah = buah.dataHargaBuah.find(
            (x) => x.id === buah.currentId
          );
          singleBuah.name = buah.inputName;
          singleBuah.price = buah.inputPrice;
          singleBuah.weight = buah.inputWeight;
          setBuah({
            ...buah,
            currentId: null,
            inputName: "",
            inputPrice: "",
            inputWeight: "",
          });
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="container">
            <h2 className="card-title">Form Pembelian Buah</h2>
            <div className="grid-container-2 form-group">
              <label>Nama Buah</label>
              <div className="input-form">
                <input
                  type="text"
                  name="name"
                  value={buah.inputName}
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
                  value={buah.inputPrice}
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
                  value={buah.inputWeight}
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
      </form>
    </div>
  );
};

export default BuahForm;
