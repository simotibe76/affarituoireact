import React, { useState, useEffect } from "react";

const Carousel = ({ selectedRegion, mapping, onSelect }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finalBoxPosition, setFinalBoxPosition] = useState(null);

  // Array dei numeri corrispondenti ai pacchi (1-20)
  const boxes = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    let interval = null;
    if (isSpinning) {
      interval = setInterval(() => {
        setRotationIndex((prev) => (prev + 1) % boxes.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isSpinning, boxes.length]);

  const handleStop = (clickedIndex) => {
    if (!isSpinning) return;

    if (!mapping || !mapping[selectedRegion]) {
      console.error("❌ Mapping is undefined in Carousel!");
      return;
    }

    // Ferma la rotazione e imposta lo stato per rivelare il numero,
    // a seguito del click sul pacco evidenziato
    setIsSpinning(false);
    setFinalBoxPosition(clickedIndex);
    setRevealed(true);

    setTimeout(() => {
      if (onSelect) {
        onSelect(mapping);
      }
    }, 2000);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {boxes.map((box, index) => (
          <button
            key={index}
            className={`box ${rotationIndex === index ? "highlight" : ""}`}
            disabled={!isSpinning}
            // Aggiungiamo un piccolo ritardo (debounce di 50ms) per registrare il click
            onClick={() => {
              if (rotationIndex === index) {
                setTimeout(() => {
                  handleStop(index);
                }, 50);
              }
            }}
          >
            {revealed && finalBoxPosition === index && mapping[selectedRegion]
              ? mapping[selectedRegion].number
              : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

