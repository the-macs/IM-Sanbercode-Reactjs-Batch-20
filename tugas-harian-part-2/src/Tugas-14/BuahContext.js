import React, { useState, createContext } from "react";

export const BuahContext = createContext();

export const BuahProvider = (props) => {
  const [buah, setBuah] = useState({
    dataHargaBuah: null,
    currentId: null,
    inputName: "",
    inputPrice: "",
    inputWeight: "",
  });

  return (
    <BuahContext.Provider value={[buah, setBuah]}>
      {props.children}
    </BuahContext.Provider>
  );
};
