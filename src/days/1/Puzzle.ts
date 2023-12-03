const isNumber = (c: string) => {
  return c >= '0' && c <= '9';
};

const getTotalCalibrationValue = (lines: string[]) => {
  const calibration_values = lines.map((line) => {
    let start = 0;
    let end = line.length - 1;
    let digit1 = '';
    let digit2 = '';
    while ((digit1.length === 0 || digit2.length === 0) && start <= end) {
      if (digit1.length === 0 && isNumber(line[start])) {
        digit1 = line[start];
      }

      if (digit2.length === 0 && isNumber(line[end])) {
        digit2 = line[end];
      }

      if (digit1.length === 0) {
        start++;
      }
      if (digit2.length === 0) {
        end--;
      }
    }

    let value: number;
    if (digit1.length === 0) {
      value = parseInt(digit2.concat(digit2));
    } else if (digit2.length === 0) {
      value = parseInt(digit1.concat(digit1));
    } else {
      value = parseInt(digit1.concat(digit2));
    }

    return value;
  });

  const total = calibration_values.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return total;
};

const first = (input: string) => {
  const lines = input.split('\n');
  return getTotalCalibrationValue(lines);
};

const expectedFirstSolution = 142;

const digitMap: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  oneight: '18',
  twone: '21',
  threeight: '38',
  fiveight: '58',
  sevenine: '79',
  eightwo: '82',
  eighthree: '83',
  nineight: '98',
};

const second = (input: string) => {
  const lines = input.split('\n');
  const replaced_lines = lines.map((line) => {
    const replacedTemp = line.replaceAll(
      /oneight|twone|threeight|fiveight|sevenine|eightwo|eighthree|nineight/gi,
      function (matched) {
        return digitMap[matched];
      }
    );

    return replacedTemp.replaceAll(
      /one|two|three|four|five|six|seven|eight|nine/gi,
      function (matched) {
        return digitMap[matched];
      }
    );
  });
  return getTotalCalibrationValue(replaced_lines);
};

const expectedSecondSolution = 281;

export { first, expectedFirstSolution, second, expectedSecondSolution };
