function isAdjacent(arr: string[], i: number, j: number): boolean {
  // Size of given 2d array
  const n = arr.length - 1;
  const m = arr[0].length - 1;

  // Checking for adjacent elements
  // and adding them to array

  // Deviation of row that gets adjusted
  // according to the provided position
  for (let dx = i > 0 ? -1 : 0; dx <= (i < n ? 1 : 0); ++dx) {
    // Deviation of the column that
    // gets adjusted according to
    // the provided position
    for (let dy = j > 0 ? -1 : 0; dy <= (j < m ? 1 : 0); ++dy) {
      if (dx != 0 || dy != 0) {
        const charX = i + dx;
        const charY = j + dy;
        const char = arr[charX][charY];

        if (/[^0-9a-zA-Z.]/g.test(char)) {
          return true;
        }
      }
    }
  }
  return false;
}

const first = (input: string) => {
  const lines = input.split('\n');
  const partialSums = lines.map((line, index, arr) => {
    let sum = 0;

    const matchedNums = line.match(/[0-9]+/g);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parts: any[] = [];
    console.log(matchedNums);

    if (matchedNums) {
      let prevIndex = 0;
      let prevLen = 0;
      parts = matchedNums.filter((num) => {
        const j = line.indexOf(num, prevIndex + prevLen);
        for (let x = 0; x < num.length; x++) {
          if (isAdjacent(arr, index, j + x)) {
            return true;
          }
        }
        prevIndex = j;
        prevLen = num.length;
      });
    }
    console.log(parts);
    sum = parts
      .map((part) => {
        return parseInt(part);
      })
      .reduce((accumulator, curValue) => accumulator + curValue, 0);
    return sum;
  });
  return partialSums.reduce((accumulator, curValue) => accumulator + curValue);
};

const expectedFirstSolution = 0;

const second = (input: string) => {
  return 'solution 2';
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
