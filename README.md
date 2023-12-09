# Advent of Code 2023

my typescript solutions for aoc 2023, using the template from here: https://github.com/edge33/AdventOfCode-typescript-template.

built with:

- [typescript](https://www.typescriptlang.org/) 👨‍💻
- [vitest](https://vitest.dev/) 🧪
- [bun](https://bun.sh/) 🧅

## Project structure

the project has the following structure:

```
src
- days: contains the solutions for the puzzles
- scripts: utility scripts for development lifecycle
- types: types and interfaces
- utils: utility scripts used for development and problem solving (i.e read an input file)
```

## Getting started

install all required dependencies with `pnpm i`

## Development

run `pnpm dev {day}` to run the solution for that day's puzzles, i.e. `pnpm dev 1` will run the puzzle class for day 1.

## Testing

You can run test for all puzzles against their expected output with `pnpm t` this will test all the solutions in the `days` folder

## Contributors

[Francesco Maida](https://edge33.github.io)
