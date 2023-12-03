const first = (input: string) => {
  const maxCubes: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = input.split('\n');

  const possible = games.map((game, index) => {
    const matched = game.match(/[0-9]+\s(red|green|blue)/gi);

    for (const cube of matched) {
      const num = parseInt(cube.match(/[0-9]+/i)[0]);
      const colour = cube.match(/red|green|blue/i)[0];
      if (num > maxCubes[colour]) {
        return 0;
      }
    }

    return index + 1;
  });

  return possible.reduce((accumulator, curValue) => accumulator + curValue, 0);
};

const expectedFirstSolution = 8;

const second = (input: string) => {
  const games = input.split('\n');
  const minSetPowers = games.map((game) => {
    const minCubesNeeded: Record<string, number> = {
      red: 0,
      blue: 0,
      green: 0,
    };
    const matched = game.match(/[0-9]+\s(red|green|blue)/gi);

    matched.forEach((cube) => {
      const num = parseInt(cube.match(/[0-9]+/i)[0]);
      const colour = cube.match(/red|green|blue/i)[0];
      if (num > minCubesNeeded[colour]) {
        minCubesNeeded[colour] = num;
      }
    });

    return Object.values(minCubesNeeded).reduce(
      (accumulator, curValue) => accumulator * curValue
    );
  });

  return minSetPowers.reduce(
    (accumulator, curValue) => accumulator + curValue,
    0
  );
};

const expectedSecondSolution = 2286;

export { first, expectedFirstSolution, second, expectedSecondSolution };
