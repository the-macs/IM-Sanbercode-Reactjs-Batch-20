import react, { useState, useEffect } from "react";

const FooterClock = () => {
  const [clock, setClock] = useState(undefined);

  useEffect(() => {
    setInterval(() => tick(), 1000);
  });

  const tick = () => {
    setClock(new Date().toLocaleTimeString());
  };

  return (
    <>
      <footer>
        <h3>Jam Sekarang : {clock}</h3>
      </footer>
    </>
  );
};

export default FooterClock;
