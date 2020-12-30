import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BookContext } from "./context";

const Home = () => {
  const [book, setBook, isLogin] = useContext(BookContext);

  let [inputSearch, setInputSearch] = useState("");
  let [inputForm, setInputForm] = useState({
    currentId: null,
    title: "",
    description: "",
    review: "",
    year: "",
    page: "",
    price: "",
    image_url: "",
  });

  let history = useHistory();

  if (isLogin === "false") history.push("/");

  useEffect(() => {
    if (book === null) {
      axios
        .get(`http://backendexample.sanbercloud.com/api/books`)
        .then((res) => {
          let data = res.data;
          setBook(data);
        });
    }
  });

  const handleChange = (e) => {
    if (String([e.target.name]) === "search") setInputSearch(e.target.value);
    else if (String([e.target.name]) === "title")
      setInputForm({ ...inputForm, title: e.target.value });
    else if (String([e.target.name]) === "description")
      setInputForm({ ...inputForm, description: e.target.value });
    else if (String([e.target.name]) === "review")
      setInputForm({ ...inputForm, review: e.target.value });
    else if (String([e.target.name]) === "year")
      setInputForm({ ...inputForm, year: e.target.value });
    else if (String([e.target.name]) === "page")
      setInputForm({ ...inputForm, page: e.target.value });
    else if (String([e.target.name]) === "price")
      setInputForm({ ...inputForm, price: e.target.value });
    else if (String([e.target.name]) === "image_url")
      setInputForm({ ...inputForm, image_url: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`http://backendexample.sanbercloud.com/api/books`).then((res) => {
      let data = res.data;
      setBook(
        data.filter((el) =>
          el.title.toString().toLowerCase().includes(inputSearch)
        )
      );
    });
  };

  // {

  //   "id":1,
  //   "created_at":"2020-11-20 22:37:05",
  //   "updated_at":"2020-11-23 02:19:14",
  //   "title":"Buku ALGORITMA DAN PEMROGRAMAN Ed. 6, Rinaldi Munir",
  //   "description":"Buku Algoritma dan Pemrograman dalam Bahasa Pascal, C, dan C++ merupakan edisi baru dari buku sebelumnya, yaitu Algoritma dan Pemrograman dalam Bahasa Pascal dan C. Buku ini disusun bagi siapapun (siswa, mahasiswa, umum) yang ingin mempelajari bidang pemrograman.",
  //   "review":"bagus untuk mempelajari dasar-dasar algoritma",
  //   "release_year":2016,
  //   "totalPage":160,
  //   "price":120000,
  //   "image_url":"https:\/\/ecs7.tokopedia.net\/img\/cache\/300\/hDjmkQ\/2020\/8\/21\/a0b92a8d-da1e-47b8-80a6-ad9629e01508.jpg"
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputForm.currentId === null) {
      axios
        .post(`http://backendexample.sanbercloud.com/api/books`, {
          title: inputForm.title,
          description: inputForm.description,
          review: inputForm.review,
          release_year: inputForm.year,
          totalPage: inputForm.page,
          price: inputForm.price,
          image_url: inputForm.image_url,
        })
        .then((res) => {
          let data = res.data;
          setInputForm({
            ...inputForm,
            title: "",
            description: "",
            review: "",
            year: "",
            page: "",
            price: "",
            image_url: "",
          });
          setBook([...book, data]);
        });
    } else {
      axios
        .put(
          `http://backendexample.sanbercloud.com/api/books/${inputForm.currentId}`,
          {
            title: inputForm.title,
            description: inputForm.description,
            review: inputForm.review,
            release_year: inputForm.year,
            totalPage: inputForm.page,
            price: inputForm.price,
            image_url: inputForm.image_url,
          }
        )
        .then(() => {
          let singleBook = book.find((x) => x.id === inputForm.currentId);
          singleBook.title = inputForm.title;
          singleBook.description = inputForm.description;
          singleBook.review = inputForm.review;
          singleBook.release_year = inputForm.year;
          singleBook.totalPage = inputForm.page;
          singleBook.price = inputForm.price;
          singleBook.image_url = inputForm.image_url;
          setBook([...book]);
          setInputForm({
            currentId: null,
            title: "",
            description: "",
            review: "",
            year: "",
            page: "",
            price: "",
            image_url: "",
          });
        });
    }
  };

  const handleEdit = (e) => {
    let id = e.target.value;
    // setBuah({ ...buah, currentId: id });
    axios
      .get(`http://backendexample.sanbercloud.com/api/books/${id}`)
      .then((res) => {
        let data = res.data;
        setInputForm({
          currentId: data.id,
          title: data.title,
          description: data.description,
          review: data.review,
          year: data.release_year,
          page: data.totalPage,
          price: data.price,
          image_url: data.image_url,
        });
      });
  };

  const handleDelete = (e) => {
    let id = parseInt(e.target.value);
    axios
      .delete(`http://backendexample.sanbercloud.com/api/books/${id}`)
      .then(() => {
        let dataBuku = book.filter((el) => {
          return el.id !== id;
        });
        setBook([...dataBuku]);
      });
  };

  return (
    <>
      {book !== null && (
        <>
          <section>
            <form align="center" onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                onChange={handleChange}
                value={inputSearch}
              />
              <button type="submit" className="buttonLong">
                Search
              </button>
            </form>
            <h1 align="center">Daftar Buku</h1>
            <table style={{ margin: "auto" }} border="1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Review</th>
                  <th>Release Year</th>
                  <th>Total Page</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {book.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{el.title}</td>
                      <td>{el.description}</td>
                      <td>{el.review}</td>
                      <td>{el.release_year}</td>
                      <td>{el.totalPage}</td>
                      <td>{el.price}</td>
                      <td>
                        <button
                          className="custom-button edit-button"
                          onClick={handleEdit}
                          value={el.id}
                        >
                          Edit
                        </button>
                        <button
                          className="custom-button delete-button"
                          onClick={handleDelete}
                          value={el.id}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <hr />
            <div className="formList">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="container">
                    <h2 className="card-title">Books Form</h2>
                    <div className="grid-container-2 form-group">
                      <label>Title</label>
                      <div className="input-form">
                        <input
                          type="text"
                          name="title"
                          value={inputForm.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Description</label>
                      <div className="input-form">
                        <textarea
                          type="number"
                          name="description"
                          value={inputForm.description}
                          onChange={handleChange}
                          rows="7"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Review</label>
                      <div className="input-form">
                        <textarea
                          type="number"
                          name="review"
                          value={inputForm.review}
                          onChange={handleChange}
                          rows="7"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Release Year</label>
                      <div className="input-form">
                        <input
                          type="number"
                          name="year"
                          min="1980"
                          value={inputForm.year}
                          onChange={handleChange}
                          required
                        />
                      </div>{" "}
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Total Page</label>
                      <div className="input-form">
                        <input
                          type="number"
                          name="page"
                          value={inputForm.page}
                          onChange={handleChange}
                          required
                        />
                      </div>{" "}
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Price</label>
                      <div className="input-form">
                        <input
                          type="number"
                          name="price"
                          min="1980"
                          value={inputForm.price}
                          onChange={handleChange}
                          required
                        />
                      </div>{" "}
                    </div>
                    <div className="grid-container-2 form-group">
                      <label>Image URL</label>
                      <div className="input-form">
                        <textarea
                          type="number"
                          name="image_url"
                          value={inputForm.image_url}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
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
          </section>
        </>
      )}
      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
  );
};

export default Home;
