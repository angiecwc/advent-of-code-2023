import { sum } from '../../utils/reduceUtils';

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

const cardRanks: Record<string, number> = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
};

function getHandType(hand: string): HandType {
  const unique = [];
  const cardCounts: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    if (Object.hasOwnProperty.call(cardCounts, hand[i])) {
      cardCounts[hand[i]] += 1;
    } else {
      cardCounts[hand[i]] = 1;
      unique.push(hand[i]);
    }
  }
  const maxCount = Math.max(...Object.values(cardCounts));

  if (maxCount === 5) {
    return HandType.FiveOfAKind;
  } else if (maxCount === 4) {
    return HandType.FourOfAKind;
  } else if (maxCount === 3) {
    if (unique.length === 2) {
      return HandType.FullHouse;
    } else {
      return HandType.ThreeOfAKind;
    }
  } else if (maxCount === 2) {
    if (unique.length === 3) {
      return HandType.TwoPair;
    } else {
      return HandType.OnePair;
    }
  } else {
    return HandType.HighCard;
  }
}

function compareHands(hand1: string, hand2: string, useJoker: boolean): number {
  let type1, type2;
  if (useJoker) {
    type1 = getHandTypeWithJoker(hand1);
    type2 = getHandTypeWithJoker(hand2);
    // console.log([hand1, type1]);
  } else {
    type1 = getHandType(hand1);
    type2 = getHandType(hand2);
  }
  const diff = type1 - type2;

  // console.log([hand1, type1]);

  if (diff === 0) {
    let i = 0;
    while (hand1[i] === hand2[i]) {
      i++;
    }
    if (i < 5) {
      return cardRanks[hand1[i]] - cardRanks[hand2[i]];
    }
  }
  return diff;
}

const first = (input: string) => {
  const lines: string[] = input.split('\n');
  const hands = [];

  for (let i = 0; i < lines.length; i++) {
    const sep = lines[i].split(' ');
    hands.push(sep);
  }

  const sortedHands = hands.sort((a, b) => compareHands(a[0], b[0], false));
  // console.log(sortedHands);

  return sortedHands
    .map((bid, index) => {
      return parseInt(bid[1]) * (index + 1);
    })
    .reduce(sum, 0);
};

const expectedFirstSolution = 6440;

function getHandTypeWithJoker(hand: string): HandType {
  const unique = [];
  let numJoker = 0;
  const cardCounts: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    if (hand[i] === 'J') {
      numJoker++;
    } else if (Object.hasOwnProperty.call(cardCounts, hand[i])) {
      cardCounts[hand[i]] += 1;
    } else {
      cardCounts[hand[i]] = 1;
      unique.push(hand[i]);
    }
  }

  let maxCount;
  if (numJoker === 5) {
    maxCount = 5;
  } else {
    maxCount = Math.max(...Object.values(cardCounts)) + numJoker;
  }

  if (maxCount === 5) {
    return HandType.FiveOfAKind;
  } else if (maxCount === 4) {
    return HandType.FourOfAKind;
  } else if (maxCount === 3) {
    if (unique.length === 2) {
      return HandType.FullHouse;
    } else {
      return HandType.ThreeOfAKind;
    }
  } else if (maxCount === 2) {
    if (unique.length === 3) {
      return HandType.TwoPair;
    } else {
      return HandType.OnePair;
    }
  } else {
    return HandType.HighCard;
  }
}

const second = (input: string) => {
  const lines: string[] = input.split('\n');
  const hands = [];

  for (let i = 0; i < lines.length; i++) {
    const sep = lines[i].split(' ');
    hands.push(sep);
  }

  const sortedHands = hands.sort((a, b) => compareHands(a[0], b[0], true));
  console.log(sortedHands.slice(0, 10));

  return sortedHands
    .map((bid, index) => {
      return parseInt(bid[1]) * (index + 1);
    })
    .reduce(sum, 0);
};

const expectedSecondSolution = 5905;

export { first, expectedFirstSolution, second, expectedSecondSolution };
