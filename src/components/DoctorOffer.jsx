import React from "react";

const DoctorOffer = ({ offerType, offerAmount, availableBoxes, onAccept, onDecline }) => {
  return (
    <div className="doctor-offer-overlay">
      <div className="doctor-offer-box">
        <div className="doctor-offer-header">
          <h2>📞 Offerta del Dottore</h2>

          {offerType === "money" ? (
            <p>Il Dottore ti offre <strong>{offerAmount}€</strong> per il tuo pacco.</p>
          ) : (
            <>
              <p>Il Dottore ti offre la possibilità di **cambiare il tuo pacco** con uno dei seguenti:</p>
              <ul>
                {availableBoxes.map(box => (
                  <li key={box.number} onClick={() => onAccept(box.number)} className="box-choice">
                    Pacco N° {box.number} - {box.name}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {offerType === "money" && (
          <div className="offer-buttons">
            <button className="accept" onClick={() => onAccept(null)}>✅ Accetta</button>
            <button className="decline" onClick={onDecline}>❌ Rifiuta</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorOffer;

