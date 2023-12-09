import { lcm } from '../../utils/utils';

function getDesertMap(mapLines: string[]): Record<string, [string, string]> {
  const desertMap: Record<string, [string, string]> = {};
  const n = mapLines.length;
  for (let i = 0; i < n; i++) {
    const nodes = mapLines[i].match(/[A-Z]{3}/gi);
    desertMap[nodes[0]] = [nodes[1], nodes[2]];
  }
  return desertMap;
}

const first = (input: string) => {
  const lines: string[] = input.split('\n');
  const directions: number[] = lines[0].split('').map((direction) => {
    if (direction === 'R') {
      return 1;
    } else {
      return 0;
    }
  });

  const mapLines = lines.slice(2);
  const desertMap: Record<string, [string, string]> = getDesertMap(mapLines);

  let curPosition: string = 'AAA';
  const end: string = 'ZZZ';
  let steps: number = 0;
  const n = directions.length;

  while (curPosition !== end) {
    for (let i = 0; i < n; i++) {
      const nextStep = desertMap[curPosition][directions[i]];
      curPosition = nextStep;
      steps++;
      if (curPosition === end) {
        return steps;
      }
    }
  }
};

const expectedFirstSolution = 2;

interface DesertMapInfo {
  map: Record<string, [string, string]>;
  starts: string[];
}

function getDesertMapInfo(mapLines: string[]): DesertMapInfo {
  const desertMap: Record<string, [string, string]> = {};
  const starts = [];
  const n = mapLines.length;

  for (let i = 0; i < n; i++) {
    const nodes = mapLines[i].match(/[A-Z0-9]{3}/gi);
    desertMap[nodes[0]] = [nodes[1], nodes[2]];

    if (nodes[0].endsWith('A')) {
      starts.push(nodes[0]);
    }
  }
  return { map: desertMap, starts: starts };
}

const second = (input: string) => {
  const lines: string[] = input.split('\n');
  const directions: number[] = lines[0].split('').map((direction) => {
    if (direction === 'R') {
      return 1;
    } else {
      return 0;
    }
  });

  const mapLines = lines.slice(2);
  const desertMapInfo: DesertMapInfo = getDesertMapInfo(mapLines);
  const desertMap = desertMapInfo.map;
  const starts = desertMapInfo.starts;

  const curPositions: string[] = starts;
  const stepCounts: number[] = new Array(starts.length).fill(0);
  const n = directions.length;
  const m = starts.length;
  let ended = false;

  for (let i = 0; i < m; i++) {
    while (!ended) {
      for (let j = 0; j < n; j++) {
        const nextStep = desertMap[curPositions[i]][directions[j]];
        curPositions[i] = nextStep;
        stepCounts[i]++;
        if (curPositions[i].endsWith('Z')) {
          ended = true;
          break;
        }
      }
    }
    ended = false;
  }

  return stepCounts.reduce((acc, curr) => {
    return lcm(acc, curr);
  }, stepCounts[0]);
};

const expectedSecondSolution = 6;

export { first, expectedFirstSolution, second, expectedSecondSolution };
