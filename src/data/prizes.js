// /src/data/prizes.js
export const prizeValues = [
  0, 5000, 1, 10000, 5, 15000, 10, 20000, 20, 30000,
  50, 50000, 75, 75000, 100, 100000, 200, 200000, 500, 300000
];

export function getShuffledPrizes() {
  const prizes = prizeValues.map((value, index) => ({
    id: index + 1,
    value
  }));

  for (let i = prizes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [prizes[i], prizes[j]] = [prizes[j], prizes[i]];
  }

  return prizes;
}

