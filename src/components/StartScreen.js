import React from "react";

const StartScreen = ({ onSelect }) => {
  const regions = [
    "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
    "Friuli Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
    "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia",
    "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
  ];

  return (
    <div className="start-screen">
      <h2>Seleziona la tua regione:</h2>
      {regions.map((region) => (
        <button key={region} onClick={() => onSelect(region)}>
          {region}
        </button>
      ))}
    </div>
  );
};

export default StartScreen;

