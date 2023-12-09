export const sum = (accumulator: number, curValue: number) =>
  accumulator + curValue;

export const multiply = (accumulator: number, curValue: number) =>
  accumulator * curValue;

export const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

// export const arrayDiff = (array1: number[], array2: number[]) => {
//   const diff: Record<string, number[]> = {};
//   for (let i = 0; i < array2.length; i++) {
//     if (array1[i] !== array2[i]) {
//       diff[i] = [array1[i], array2[i]];
//     }
//   }
//   return diff;
// };
