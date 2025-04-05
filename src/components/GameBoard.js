// /src/components/GameBoard.js
import React, { useState } from "react";
import { getShuffledPrizes } from "../data/prizes";
import regionsData from "../data/regions";
import RegionBox from "./RegionBox";

// Funzione helper per fare lo shuffle di un array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const GameBoard = ({ selectedRegion }) => {
  // Mapping segreto dei 20 premi (random) – ogni oggetto ha { id: <boxNumber>, value: <premio> }
  const [prizesMapping] = useState(getShuffledPrizes());
  const [openedBoxes, setOpenedBoxes] = useState([]);

  // Creazione del mapping casuale delle regioni:
  // Partiamo dall'array di regioni e lo shuffliamo, assegnando ad ogni elemento un "id" pari alla sua posizione +1
  const [regionMapping] = useState(() => {
    const shuffled = shuffleArray(regionsData);
    return shuffled.map((region, index) => ({
      name: region.name,
      id: index + 1
    }));
  });

  // Il pacco del giocatore si individua tra le regioni random assegnate per il nome selezionato
  const playerBox = regionMapping.find(r => r.name === selectedRegion);

  // Il blocco centrale mostra tutte le regioni, tranne quella del giocatore, ordinate per id (in ordine crescente)
  const remainingRegionBoxes = regionMapping
    .filter(r => r.name !== selectedRegion)
    .sort((a, b) => a.id - b.id);

  // Funzione per aprire un box (passando il numero del pacco, cioè l'id)
  const handleOpenBox = (boxId) => {
    const prizeObj = prizesMapping.find(p => p.id === boxId);
    setOpenedBoxes(prev => [...prev, boxId]);
    return prizeObj ? prizeObj.value : null;
  };

  // Premi ancora in gioco: dai 20 pacchi, quelli che non sono stati aperti
  const remainingPrizes = prizesMapping.filter(p => !openedBoxes.includes(p.id));
  // Premi bassi: per esempio, consideriamo quelli con valore inferiore a 5000, ordinati in ordine crescente
  const leftPrizes = remainingPrizes
    .filter(p => p.value < 5000)
    .sort((a, b) => a.value - b.value);
  // Premi alti: quelli con valore >= 5000, ordinati in ordine crescente
  const rightPrizes = remainingPrizes
    .filter(p => p.value >= 5000)
    .sort((a, b) => a.value - b.value);

  return (
    <>
      <h1>🎲 Affari Tuoi - {selectedRegion} Edition 🎲</h1>
      <h2>Il tuo pacco: {playerBox ? `${playerBox.name} - ${playerBox.id}` : "?"}</h2>
      <div className="page-layout">
        {/* Colonna dei premi bassi */}
        <div className="prizes-board low-values">
          <h3>Premi bassi</h3>
          <ul>
            {leftPrizes.map(prize => (
              <li key={prize.id}>{prize.value}€</li>
            ))}
          </ul>
        </div>

        {/* Blocco centrale: per ciascuna regione, mostra il nome e il numero assegnato (random) */}
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

        {/* Colonna dei premi alti */}
        <div className="prizes-board high-values">
          <h3>Premi alti</h3>
          <ul>
            {rightPrizes.map(prize => (
              <li key={prize.id}>{prize.value}€</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visualizzazione del pacco del giocatore */}
      <div className="your-box">
        <h3>Il tuo pacco</h3>
        <div className="box">
          {playerBox ? `${playerBox.name} - ${playerBox.id}` : ""}
        </div>
      </div>
    </>
  );
};

export default GameBoard;

