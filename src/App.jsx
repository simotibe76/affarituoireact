// src/App.jsx
import React, { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import Carousel from "./components/Carousel.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  // Stato per memorizzare i dati della mappatura e la regione selezionata
  const [mappingData, setMappingData] = useState({});
  // Controllo dello stage: "start", "carousel", "gameboard"
  const [gameStage, setGameStage] = useState("start");

  // Quando la mappatura viene generata in StartScreen:
  const handleMappingGenerated = (data) => {
    setMappingData((prev) => ({ ...prev, ...data }));
    setGameStage("carousel");  // ✅ Dopo la selezione della regione, passa a Carousel
  };

  // Quando il Carousel è completato:
  const handleCarouselComplete = () => {
    setGameStage("gameboard");  // ✅ Solo dopo il Carousel si passa a GameBoard
  };

  return (
    <div className="App">
      {gameStage === "start" && (
        <StartScreen onMappingGenerated={handleMappingGenerated} />
      )}
      {gameStage === "carousel" && mappingData && (
        <Carousel
          selectedRegion={mappingData.selectedRegion}
          mapping={mappingData.mapping}
          onSelect={handleCarouselComplete}  // ✅ Chiamata per passare a GameBoard dopo il carosello
        />
      )}
      {gameStage === "gameboard" && mappingData && (
        <GameBoard
          selectedRegion={mappingData.selectedRegion}
          assignedBoxNumber={mappingData.mapping[mappingData.selectedRegion].number}
          regionMapping={Object.values(mappingData.mapping)}
          gameMode={mappingData.gameMode}
        />
      )}
    </div>
  );
}

export default App;

