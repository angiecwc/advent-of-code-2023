import { sum } from '../../utils/reduceUtils';

const winningNumsCount = (card: string) => {
  const card_split = card.split(' | ');
  const winning_numbers = card_split[0]
    .split(' ')
    .filter((elem) => elem !== '');
  const your_numbers = card_split[1].split(' ').filter((elem) => elem !== '');
  let winning_num_count = 0; // your winning number count

  for (const n of your_numbers) {
    if (winning_numbers.includes(n)) {
      winning_num_count++;
    }
  }
  return winning_num_count;
};
const first = (input: string) => {
  const lines = input.split('\n');
  const cards = lines.map((line) => {
    return line.slice(line.indexOf(':') + 1).trim();
  });

  const points = cards.map(winningNumsCount);

  return points
    .filter((count) => count > 0)
    .map((count) => {
      return Math.pow(2, count - 1);
    })
    .reduce(sum, 0);
};

const expectedFirstSolution = 13;

const second = (input: string) => {
  const lines = input.split('\n');
  const cards = lines.map((line) => {
    return line.slice(line.indexOf(':') + 1).trim();
  });
  const n = cards.length;
  const scratchCardTotals = Array(n).fill(1);

  const points = cards.map(winningNumsCount);

  for (let i = 0; i < n; i++) {
    const cardPoints = points[i];
    const copiesEach = scratchCardTotals[i];
    for (let j = i + 1; j <= cardPoints + i; j++) {
      scratchCardTotals[j] += copiesEach;
    }
  }
  return scratchCardTotals.reduce(sum, 0);
};

const expectedSecondSolution = 30;

export { first, expectedFirstSolution, second, expectedSecondSolution };
