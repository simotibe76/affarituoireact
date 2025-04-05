import React, { useState } from "react";
import "./styles.css";  // Importa gli stili globali
import StartScreen from "./components/StartScreen";
import Carousel from "./components/Carousel";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);

  return (
    <div className="app">
      <h1>🎲 Affari Tuoi - React Edition 🎲</h1>
      {!selectedRegion ? (
        <StartScreen onSelect={(region) => setSelectedRegion(region)} />
      ) : !selectedBox ? (
        <Carousel onSelect={(box) => setSelectedBox(box)} />
      ) : (
        <GameBoard selectedRegion={selectedRegion} selectedBox={selectedBox} />
      )}
    </div>
  );
};

export default App;

