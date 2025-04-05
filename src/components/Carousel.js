import React, { useState, useEffect } from "react";

const Carousel = ({ onSelect }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [selectedBox, setSelectedBox] = useState(null);
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setShuffledNumbers(shuffled);
    const interval = setInterval(() => {
      if (isSpinning) {
        setRotationIndex((prev) => (prev + 1) % shuffled.length);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isSpinning]);

  const handleSelectBox = (index) => {
    if (!isSpinning) return;
    setIsSpinning(false);
    const selected = {
      number: shuffledNumbers[index],
      index: index,
      remainingNumbers: shuffledNumbers.filter((_, i) => i !== index)
    };
    setSelectedBox(selected);
    onSelect(selected);
  };

  return (
    <div className="carousel">
      {shuffledNumbers.map((num, index) => (
        <button
          key={index}
          className={`box ${rotationIndex === index ? "highlight" : ""} ${selectedBox?.index === index ? "selected" : ""}`}
          onClick={() => handleSelectBox(index)}
          disabled={!isSpinning}
        >
          📦
        </button>
      ))}
    </div>
  );
};

export default Carousel;

