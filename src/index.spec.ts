import { readdirSync } from 'fs';
import { describe, expect, it } from 'vitest';
import readFile from './utils/readFile';
import Puzzle from './types/Puzzle';

describe('AoC test runner', () => {
  const dirs = readdirSync('./src/days', { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const day of dirs) {
    it(`Tests day ${day}`, async () => {
      let exampleOneInput = '';
      let exampleTwoInput = '';
      try {
        const puzzlePath = `src/days/${day}`;
        exampleOneInput = await readFile(`${puzzlePath}/example-1.txt`);
        exampleTwoInput = await readFile(`${puzzlePath}/example-2.txt`);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
      const {
        first,
        expectedFirstSolution,
        second,
        expectedSecondSolution,
      }: Puzzle = await import(`./days/${day}/Puzzle`);

      expect(first(exampleOneInput)).toBe(expectedFirstSolution);
      expect(second(exampleTwoInput)).toBe(expectedSecondSolution);
    });
  }
});
