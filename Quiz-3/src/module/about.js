import React from "react";

const Home = () => {
  return (
    <>
      <section>
        <div style={{ border: "1px solid", margin: "10px" }}>
          <h1>Daftar Peserta Sanbercode Bootcamp ReactJS</h1>
          <div id="article-list">
            <ol>
              <li>
                <strong>Nama</strong>: Esa Hadistra
              </li>
              <li>
                <strong>Email</strong>: esahadistra@gmail.com
              </li>
              <li>
                <strong>Sistem Operasi yang digunakan</strong>: macOSX
              </li>
              <li>
                <strong>Akun Github</strong>: the-macs
              </li>
              <li>
                <strong>Akun Telegram</strong>: @esahd_94
              </li>
            </ol>
          </div>
        </div>
      </section>

      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
  );
};

export default Home;
