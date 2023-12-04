import { sum, multiply } from '../../utils/reduceUtils';

interface AdjChar {
  c: string;
  x: number;
  y: number;
}

function getAdjacent(arr: string[], i: number, j: number): AdjChar[] {
  // Size of given 2d array
  const n = arr.length - 1;
  const m = arr[0].length - 1;

  // Checking for adjacent elements
  // and adding them to array
  const adj: AdjChar[] = [];

  // Deviation of row that gets adjusted
  // according to the provided position
  for (let dx = i > 0 ? -1 : 0; dx <= (i < n ? 1 : 0); ++dx) {
    // Deviation of the column that
    // gets adjusted according to
    // the provided position
    for (let dy = j > 0 ? -1 : 0; dy <= (j < m ? 1 : 0); ++dy) {
      if (dx != 0 || dy != 0) {
        const charY = i + dx;
        const charX = j + dy;
        const char = arr[charY][charX];

        adj.push({ c: char, x: charX, y: charY });
      }
    }
  }
  return adj;
}

function isAdjacent(adj: AdjChar[], regex: RegExp): boolean {
  for (const adjChar of adj) {
    if (regex.test(adjChar.c)) {
      return true;
    }
  }

  return false;
}

const first = (input: string) => {
  const lines = input.split('\n');
  const lineParts = lines.map((line, index, arr) => {
    const matchedNums = line.match(/[0-9]+/g);
    let parts: string[] = [];

    if (matchedNums) {
      let prevIndex = 0;
      let prevLen = 0;
      parts = matchedNums.filter((num) => {
        const j = line.indexOf(num, prevIndex + prevLen);
        prevIndex = j;
        prevLen = num.length;
        for (let x = 0; x < num.length; x++) {
          const adj = getAdjacent(arr, index, j + x);
          if (isAdjacent(adj, /[^0-9a-zA-Z.]/g)) {
            return true;
          }
        }
      });
    }
    const partNums = parts.map((part) => {
      return parseInt(part);
    });

    return partNums;
  });

  return lineParts.flat().reduce(sum, 0);
};

const expectedFirstSolution = 4419;

function isGear(adj: AdjChar[]): boolean {
  let count = 0;
  const visited: Record<number, number[]> = {};
  for (const adjChar of adj) {
    if (/[0-9]+/.test(adjChar.c)) {
      if (!(adjChar.y in visited)) {
        visited[adjChar.y] = [adjChar.x];
        count++;
      } else if (
        !(
          visited[adjChar.y].includes(adjChar.x - 1) ||
          visited[adjChar.y].includes(adjChar.x + 1)
        )
      ) {
        count++;
        visited[adjChar.y].push(adjChar.x);
      } else {
        visited[adjChar.y].push(adjChar.x);
      }
    }
  }

  if (count == 2) {
    return true;
  } else {
    return false;
  }
}

const getGearRatios = (lines: string[], n: number) => {
  const gearRatios = [];
  for (let i = 0; i < n; i++) {
    const line = lines[i];

    for (let j = 0; j < n; j++) {
      const char = line[j];

      if (/(\*)/.test(char)) {
        const adj = getAdjacent(lines, i, j);
        if (isGear(adj)) {
          // Gear
          const gearParts: AdjChar[] = adj.filter((char) =>
            /[0-9]+/.test(char.c)
          );

          let nums: number[] = [];
          for (const part of gearParts) {
            let num = part.c;
            const y = part.y;
            let x1 = part.x - 1;
            let x2 = part.x + 1;

            while (x1 >= 0 && /[0-9]/.test(lines[y][x1])) {
              num = lines[y][x1] + num;
              x1--;
            }

            while (x2 < n && /[0-9]/.test(lines[y][x2])) {
              num += lines[y][x2];
              x2++;
            }

            nums.push(parseInt(num));
          }

          if (nums.length > 2) {
            nums = nums.filter((item, index) => nums.indexOf(item) === index);
            if (nums.length === 1) {
              nums.push(nums[0]);
            }
          }

          gearRatios.push(nums.reduce(multiply, 1));
        }
      }
    }
  }
  return gearRatios;
};
const second = (input: string) => {
  const lines = input.split('\n');
  const n = lines.length;
  const gearRatios = getGearRatios(lines, n);

  return gearRatios.reduce(sum);
};

const expectedSecondSolution = 467835;

export { first, expectedFirstSolution, second, expectedSecondSolution };
