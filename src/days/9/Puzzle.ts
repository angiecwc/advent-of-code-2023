import { sum } from '../../utils/utils';

function getSequences(input: string): number[][] {
  const lines = input.split('\n');
  const sequences = lines.map((line) => {
    return line.match(/-?[0-9]+/gi).map((term) => parseInt(term));
  });
  return sequences;
}

function getTermsToExtrapolate(sequence: number[], next: boolean): number[] {
  let curSequence = sequence;
  const terms = [];
  if (next) {
    terms.push(sequence[sequence.length - 1]);
  } else {
    terms.push(sequence[0]);
  }
  let differences: number[] = [];
  let isConstant = false;

  while (!isConstant) {
    const n = curSequence.length;
    for (let i = 0; i < n - 1; i++) {
      differences.push(curSequence[i + 1] - curSequence[i]);
    }
    if (next) {
      terms.push(differences[differences.length - 1]);
    } else {
      terms.push(differences[0]);
    }

    isConstant = !differences.some((diff) => diff !== differences[0]);
    curSequence = differences;
    differences = [];
  }
  return terms;
}

const first = (input: string) => {
  const sequences = getSequences(input);
  const extrapolatedValues = [];

  for (const sequence of sequences) {
    const lastTerms = getTermsToExtrapolate(sequence, true);
    extrapolatedValues.push(lastTerms.reduceRight(sum));
  }
  return extrapolatedValues.reduce(sum);
};

const expectedFirstSolution = 114;

const second = (input: string) => {
  const sequences = getSequences(input);
  const extrapolatedValues = [];

  for (const sequence of sequences) {
    const lastTerms = getTermsToExtrapolate(sequence, false);
    extrapolatedValues.push(
      lastTerms.reduceRight((acc: number, term: number) => term - acc, 0)
    );
  }
  return extrapolatedValues.reduce(sum);
};

const expectedSecondSolution = 2;

export { first, expectedFirstSolution, second, expectedSecondSolution };
