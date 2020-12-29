import react, { useState, useEffect, useContext } from "react";

import { ThemeContext } from "./Tugas-15/ThemeContext";

const FooterClock = () => {
  const [clock, setClock] = useState(undefined);

  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    setInterval(() => tick(), 1000);
  });

  const tick = () => {
    setClock(new Date().toLocaleTimeString());
  };

  return (
    <>
      <footer className={theme}>
        <h3>Jam Sekarang : {clock}</h3>
      </footer>
    </>
  );
};

export default FooterClock;
