import React from "react";
import { BuahProvider } from "./BuahContext";
import BuahList from "./BuahList";
import BuahForm from "./BuahForm";

const Buah = () => {
  return (
    <>
      <h1
        style={{
          backgroundColor: "turquoise",
          padding: "5px 0",
          marginTop: "0px",
        }}
      >
        TUGAS-14
      </h1>
      <div className="grid grid-container-2">
        <BuahProvider>
          <BuahForm />
          <BuahList />
        </BuahProvider>
      </div>
    </>
  );
};

export default Buah;
