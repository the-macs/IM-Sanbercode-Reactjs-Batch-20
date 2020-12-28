import React, { useContext, useEffect } from "react";
import { BuahContext } from "./BuahContext";
import axios from "axios";

const numberFormat = (value) =>
  new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

const BuahList = () => {
  const [buah, setBuah] = useContext(BuahContext);

  useEffect(() => {
    if (buah.dataHargaBuah == null) {
      axios
        .get(`http://backendexample.sanbercloud.com/api/fruits`)
        .then((res) => {
          let data = res.data;
          setBuah({
            ...buah,
            dataHargaBuah: data.map((el) => {
              return {
                id: el.id,
                name: el.name,
                price: el.price,
                weight: el.weight,
              };
            }),
          });
        });
    }
  });

  const handleEdit = (e) => {
    let id = e.target.value;
    setBuah({ ...buah, currentId: id });
  };

  const handleDelete = (e) => {
    let id = parseInt(e.target.value);
    axios
      .delete(`http://backendexample.sanbercloud.com/api/fruits/${id}`)
      .then(() => {
        let dataBuah = buah.dataHargaBuah.filter((el) => {
          return el.id !== id;
        });
        setBuah({
          ...buah,
          dataHargaBuah: [...dataBuah],
        });
      });
  };

  return (
    <>
      {buah.dataHargaBuah !== null && (
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
                    {buah.dataHargaBuah.length !== 0 ? (
                      buah.dataHargaBuah.map((el, i) => {
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
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" height="100px">
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p align="left">
                  <em>Total Data : {buah.dataHargaBuah.length}</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuahList;
