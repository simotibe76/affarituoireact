// CalculateDoctorOfferAI.js

// Funzione helper per determinare il ritardo della chiamata basato sul valore del pacco del concorrente 
// e sulla distribuzione dei premi rimanenti.
// Considera "blue" i premi inferiori a 5000 e "red" quelli 5000 o superiori.
const determineCallDelay = (playerBoxValue, remainingPrizes) => {
  let delay = 3; // ritardo standard
  if (playerBoxValue >= 200000) {
    const blueCount = remainingPrizes.filter(item => item.prize < 5000).length;
    const redCount = remainingPrizes.filter(item => item.prize >= 5000).length;
    if (blueCount > redCount) {
      delay = 4 + Math.floor(Math.random() * 2); // genera 4 o 5
    }
  }
  return delay;
};

export const offerTipo1AI = (remainingPrizes, openedCount) => {
  if (!remainingPrizes || remainingPrizes.length === 0) return 0;
  const validPrizes = remainingPrizes.filter(
    (prize) => typeof prize.prize === "number" && !isNaN(prize.prize)
  );
  const totalValue = validPrizes.reduce((sum, prize) => sum + prize.prize, 0);
  if (validPrizes.length === 0 || isNaN(totalValue)) return 0;
  const expectedValue = totalValue / validPrizes.length;
  const multiplier = openedCount >= 6 ? 0.6 : 0.5;
  const offerValue = expectedValue * multiplier;
  return Math.round(offerValue / 500) * 500;
};

export const offerTipo2CambioPacco = (fullRegions, currentBoxNumber) => {
  const availableRegions = fullRegions.filter(
    (region) => region.number !== currentBoxNumber
  );
  return {
    type: "CambioPacco",
    message: "Il Dottore ti offre la possibilità di cambiare pacco!",
    availableRegions,
  };
};

export const offerTipo3Scelta = (remainingPrizes, allRegions, currentBoxNumber, openedCount) => {
  const monetaryOffer = offerTipo1AI(remainingPrizes, openedCount);
  const availableRegions = allRegions.filter(
    (region) => region.number !== currentBoxNumber
  );
  return {
    type: "SceltaTripla",
    message: `Il Dottore ti propone: accetta ${monetaryOffer}€, oppure cambia pacco, oppure rifiuta l’offerta e prosegui.`,
    monetaryOffer,
    availableRegions,
  };
};

export const calculateDoctorOfferAI = (remainingPrizes, allRegions, currentBoxNumber, openedCount, playerBoxValue) => {
  console.log("🟢 AI ATTIVA: CalculateDoctorOfferAI è stato chiamato!");
  console.log("📦 Pacchi rimanenti:", remainingPrizes.length);
  console.log("🎲 Numero di aperture finora:", openedCount);
  
  // Calcola il ritardo in base al valore del pacco del concorrente e alla distribuzione dei premi
  const callDelay = determineCallDelay(playerBoxValue, remainingPrizes);
  console.log("⏱ Call delay determinato:", callDelay);

  // Selezione dinamica del tipo di offerta
  const randomChoice = Math.floor(Math.random() * 3);
  let offer;
  switch (randomChoice) {
    case 0: {
      const monetaryOffer = offerTipo1AI(remainingPrizes, openedCount);
      offer = {
        type: "Tipo1",
        message: `Il Dottore ti offre ${monetaryOffer}€ in denaro.`,
        monetaryOffer,
      };
      console.log("👉 Offerta Tipo1 (denaro)");
      break;
    }
    case 1: {
      offer = offerTipo2CambioPacco(allRegions, currentBoxNumber);
      console.log("👉 Offerta Tipo2 (cambio pacco)");
      break;
    }
    case 2: {
      offer = offerTipo3Scelta(remainingPrizes, allRegions, currentBoxNumber, openedCount);
      console.log("👉 Offerta Tipo3 (scelta tripla)");
      break;
    }
    default: {
      offer = offerTipo3Scelta(remainingPrizes, allRegions, currentBoxNumber, openedCount);
      break;
    }
  }
  // Integra il valore callDelay nell'offerta per guidare la tempistica della prossima chiamata
  return { ...offer, callDelay };
};

export default calculateDoctorOfferAI;
