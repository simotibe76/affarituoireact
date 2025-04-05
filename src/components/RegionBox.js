// /src/components/RegionBox.js
import React, { useState } from "react";

const RegionBox = ({ number, regionName, onOpen }) => {
  const [opened, setOpened] = useState(false);
  const [revealedValue, setRevealedValue] = useState(null);

  const handleClick = () => {
    if (!opened) {
      const value = onOpen(number);
      setRevealedValue(value);
      setOpened(true);
    }
  };

  return (
    <div className={`region-box ${opened ? "opened" : ""}`} onClick={handleClick}>
      {!opened ? (
        <p>{regionName} - {number}</p>
      ) : (
        <p>💰 {revealedValue !== null ? revealedValue : ""}€</p>
      )}
    </div>
  );
};

export default RegionBox;

