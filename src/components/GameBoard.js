import React, { useState, useEffect } from "react";
import { getShuffledPrizes } from "../data/prizes";
import regionsData from "../data/regions";
import DoctorCall from "./DoctorCall";
import RegionBox from "./RegionBox";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const GameBoard = ({ selectedRegion }) => {
  const [prizesMapping] = useState(getShuffledPrizes());
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [doctorCalling, setDoctorCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);

  const [regionMapping] = useState(() => {
    const shuffled = shuffleArray(regionsData);
    return shuffled.map((region, index) => ({
      name: region.name,
      id: index + 1
    }));
  });

  const playerBox = regionMapping.find(r => r.name === selectedRegion);
  const remainingRegionBoxes = regionMapping
    .filter(r => r.name !== selectedRegion)
    .sort((a, b) => a.id - b.id);

  const remainingPrizes = prizesMapping.filter(p => !openedBoxes.includes(p.id));
  const leftPrizes = remainingPrizes.filter(p => p.value < 5000).sort((a, b) => a.value - b.value);
  const rightPrizes = remainingPrizes.filter(p => p.value >= 5000).sort((a, b) => a.value - b.value);

  // Verifica se la chiamata del Dottore deve essere attivata (ogni 3 pacchi aperti)
  useEffect(() => {
    if (openedBoxes.length > 0 && openedBoxes.length % 3 === 0 && openedBoxes.length <= 15) {
      setDoctorCalling(true);
    }
  }, [openedBoxes]);

  const handleOpenBox = (boxId) => {
    if (!openedBoxes.includes(boxId)) {
      const prizeObj = prizesMapping.find(p => p.id === boxId);
      setOpenedBoxes(prev => [...prev, boxId]);
      return prizeObj ? prizeObj.value : null;
    }
  };

  const handleAcceptCall = () => {
    setDoctorCalling(false);
    setCallAccepted(true);

    // Reset della chiamata per i turni successivi
    setTimeout(() => {
      setCallAccepted(false);
    }, 1000);
  };

  const handleDeclineCall = () => {
    setDoctorCalling(false);

    // Reset della chiamata per i turni successivi
    setTimeout(() => {
      setCallAccepted(false);
    }, 1000);
  };

  return (
    <>
      <h1>🎲 Affari Tuoi - {selectedRegion} Edition 🎲</h1>
      <h2>Il tuo pacco: {playerBox ? `${playerBox.name} - ${playerBox.id}` : "?"}</h2>

      {/* Popup chiamata del Dottore */}
      {doctorCalling && <DoctorCall onAccept={handleAcceptCall} onDecline={handleDeclineCall} />}

      <div className="page-layout">
        {/* Premi bassi */}
        <div className="prizes-board low-values">
          <h3>Premi bassi</h3>
          <ul>
            {leftPrizes.map(prize => (
              <li key={prize.id}>{prize.value}€</li>
            ))}
          </ul>
        </div>

        {/* Griglia delle regioni */}
        <div className="region-boxes">
          {remainingRegionBoxes.map(region => (
            <RegionBox
              key={region.id}
              number={region.id}
              regionName={region.name}
              onOpen={handleOpenBox}
            />
          ))}
        </div>

        {/* Premi alti */}
        <div className="prizes-board high-values">
          <h3>Premi alti</h3>
          <ul>
            {rightPrizes.map(prize => (
              <li key={prize.id}>{prize.value}€</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pacco del giocatore */}
      <div className="your-box">
        <h3>Il tuo pacco</h3>
        <div className="box">{playerBox ? `${playerBox.name} - ${playerBox.id}` : ""}</div>
      </div>
    </>
  );
};

export default GameBoard;

