import { multiply } from '../../utils/utils';

const first = (input: string) => {
  const lines = input.split('\n');
  const times = lines[0].match(/[0-9]+/gi).map((t) => {
    return parseInt(t);
  });
  const distances = lines[1].match(/[0-9]+/gi).map((d) => {
    return parseInt(d);
  });

  // Quadratic inequality x(x - t) > d => x^2 - xt + d < 0
  // a = 1, b = time, c = distance
  const numSolutions = times.map((b, index) => {
    const c = distances[index];
    const minSolution = Math.floor(
      (b - Math.sqrt(Math.pow(b, 2) - 4 * c)) / 2 + 1
    );
    const maxSolution = b - minSolution;
    return maxSolution - minSolution + 1;
  });

  return numSolutions.reduce(multiply, 1);
};

const expectedFirstSolution = 288;

const second = (input: string) => {
  const lines = input.split('\n');
  const time = parseInt(
    lines[0].match(/[0-9]+/gi).reduce((time, digits) => {
      return time.concat(digits);
    }, '')
  );
  const distance = parseInt(
    lines[1].match(/[0-9]+/gi).reduce((dist, digits) => {
      return dist.concat(digits);
    }, '')
  );

  // Quadratic inequality x(x - t) > d => x^2 - xt + d < 0
  // a = 1, b = time, c = distance
  const left = time / 2;
  const right = Math.sqrt(Math.pow(time, 2) - 4 * distance) / 2;
  const minSolution = Math.floor(left - right + 1);
  const maxSolution = time - minSolution;

  return maxSolution - minSolution + 1;
};

const expectedSecondSolution = 71503;

export { first, expectedFirstSolution, second, expectedSecondSolution };
