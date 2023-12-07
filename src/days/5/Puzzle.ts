const getMappedValues = function (mapping: string[]) {
  return function (source: number) {
    const n = mapping.length;
    for (let i = 0; i < n; i++) {
      const values = mapping[i].split(' ');
      const destStart = parseInt(values[0]);
      const sourceStart = parseInt(values[1]);
      const range = parseInt(values[2]);

      if (source >= sourceStart && source < sourceStart + range) {
        return destStart + (source - sourceStart);
      }
    }
    return source;
  };
};

const first = (input: string) => {
  const lines = input.split('\n').filter((line) => line !== '');
  const seeds = lines[0].match(/[0-9]+/gi).map((seed) => {
    return parseInt(seed);
  });

  const mapIndices: Record<string, number> = {
    seedToSoil: lines.indexOf('seed-to-soil map:'),
    soilToFertilizer: lines.indexOf('soil-to-fertilizer map:'),
    fertilizerToWater: lines.indexOf('fertilizer-to-water map:'),
    waterToLight: lines.indexOf('water-to-light map:'),
    lightToTemp: lines.indexOf('light-to-temperature map:'),
    tempToHumidity: lines.indexOf('temperature-to-humidity map:'),
    humidityToLocation: lines.indexOf('humidity-to-location map:'),
  };

  const seedToSoil = lines.slice(
    mapIndices.seedToSoil + 1,
    mapIndices.soilToFertilizer
  );
  const soilToFertilizer = lines.slice(
    mapIndices.soilToFertilizer + 1,
    mapIndices.fertilizerToWater
  );
  const fertilizerToWater = lines.slice(
    mapIndices.fertilizerToWater + 1,
    mapIndices.waterToLight
  );
  const waterToLight = lines.slice(
    mapIndices.waterToLight + 1,
    mapIndices.lightToTemp
  );
  const lightToTemp = lines.slice(
    mapIndices.lightToTemp + 1,
    mapIndices.tempToHumidity
  );
  const tempToHumidity = lines.slice(
    mapIndices.tempToHumidity + 1,
    mapIndices.humidityToLocation
  );
  const humidityToLoction = lines.slice(mapIndices.humidityToLocation + 1);

  const locations = seeds
    .map(getMappedValues(seedToSoil))
    .map(getMappedValues(soilToFertilizer))
    .map(getMappedValues(fertilizerToWater))
    .map(getMappedValues(waterToLight))
    .map(getMappedValues(lightToTemp))
    .map(getMappedValues(tempToHumidity))
    .map(getMappedValues(humidityToLoction));

  return Math.min(...locations);
};

const expectedFirstSolution = 35;

const getMappedRanges = function (mapping: string[]) {
  return function (sourceInput: number[]) {
    const outputRanges = [];
    const notFoundRanges = [sourceInput];
    const n = mapping.length;

    for (let i = 0; i < n; i++) {
      const values = mapping[i].split(' ');

      const destStart = parseInt(values[0]);
      const sourceMapStart = parseInt(values[1]);
      const mapRange = parseInt(values[2]);
      const sourceMapEnd = sourceMapStart + mapRange;

      const newNotFoundRanges = [];

      for (let j = 0; j < notFoundRanges.length; j++) {
        const sourceRangeStart = notFoundRanges[j][0];
        const sourceRange = notFoundRanges[j][1];
        const sourceRangeEnd = sourceRangeStart + sourceRange;

        if (
          sourceRangeStart >= sourceMapStart &&
          sourceRangeEnd <= sourceMapEnd
        ) {
          // Within map
          const outputStart = destStart + (sourceRangeStart - sourceMapStart);
          outputRanges.push([outputStart, sourceRange]);
        } else if (
          sourceRangeStart < sourceMapStart &&
          sourceRangeEnd >= sourceMapStart &&
          sourceRangeEnd <= sourceMapEnd
        ) {
          // Overlaps with map start only
          const nonOverlap = sourceMapStart - sourceRangeStart;
          const overlap = sourceRange - nonOverlap;

          outputRanges.push([destStart, overlap]);
          newNotFoundRanges.push([sourceRangeStart, nonOverlap]);
        } else if (
          sourceRangeStart >= sourceMapStart &&
          sourceRangeStart < sourceMapEnd &&
          sourceRangeEnd > sourceMapEnd
        ) {
          // Overlaps with map end
          const overlap = sourceMapEnd - sourceRangeStart;
          const nonOverlap = sourceRange - overlap;

          outputRanges.push([
            destStart + (sourceRangeStart - sourceMapStart),
            overlap,
          ]);

          newNotFoundRanges.push([sourceMapEnd, nonOverlap]);
        } else if (
          sourceRangeStart < sourceMapStart &&
          sourceRangeEnd > sourceMapEnd
        ) {
          // Encompasses map
          outputRanges.push([destStart, mapRange]);

          newNotFoundRanges.push([
            sourceRangeStart,
            sourceMapStart - sourceRangeStart,
          ]);

          newNotFoundRanges.push([sourceMapEnd, sourceRangeEnd - sourceMapEnd]);
        } else {
          // Not found in map
          newNotFoundRanges.push([sourceRangeStart, sourceRange]);
        }
      }

      notFoundRanges.splice(0, notFoundRanges.length, ...newNotFoundRanges);
    }

    return outputRanges.concat(notFoundRanges);
  };
};

function getArrayPairs(arr: number[]): number[][] {
  // Assumption: length of array is even
  const numPairs = arr.length / 2;
  const pairs = [];

  for (let i = 0; i <= numPairs; i += 2) {
    pairs.push([arr[i], arr[i + 1]]);
  }
  return pairs;
}

const second = (input: string) => {
  const lines = input.split('\n').filter((line) => line !== '');
  const unpaired = lines[0].match(/[0-9]+/gi).map((seed) => {
    return parseInt(seed);
  });
  const seeds = getArrayPairs(unpaired);

  const mapIndices: Record<string, number> = {
    seedToSoil: lines.indexOf('seed-to-soil map:'),
    soilToFertilizer: lines.indexOf('soil-to-fertilizer map:'),
    fertilizerToWater: lines.indexOf('fertilizer-to-water map:'),
    waterToLight: lines.indexOf('water-to-light map:'),
    lightToTemp: lines.indexOf('light-to-temperature map:'),
    tempToHumidity: lines.indexOf('temperature-to-humidity map:'),
    humidityToLocation: lines.indexOf('humidity-to-location map:'),
  };

  const seedToSoil = lines.slice(
    mapIndices.seedToSoil + 1,
    mapIndices.soilToFertilizer
  );
  const soilToFertilizer = lines.slice(
    mapIndices.soilToFertilizer + 1,
    mapIndices.fertilizerToWater
  );
  const fertilizerToWater = lines.slice(
    mapIndices.fertilizerToWater + 1,
    mapIndices.waterToLight
  );
  const waterToLight = lines.slice(
    mapIndices.waterToLight + 1,
    mapIndices.lightToTemp
  );
  const lightToTemp = lines.slice(
    mapIndices.lightToTemp + 1,
    mapIndices.tempToHumidity
  );
  const tempToHumidity = lines.slice(
    mapIndices.tempToHumidity + 1,
    mapIndices.humidityToLocation
  );
  const humidityToLoction = lines.slice(mapIndices.humidityToLocation + 1);

  // Input and output for map must be pairs of ranges
  const locationRanges = seeds
    .flatMap(getMappedRanges(seedToSoil))
    .flatMap(getMappedRanges(soilToFertilizer))
    .flatMap(getMappedRanges(fertilizerToWater))
    .flatMap(getMappedRanges(waterToLight))
    .flatMap(getMappedRanges(lightToTemp))
    .flatMap(getMappedRanges(tempToHumidity))
    .flatMap(getMappedRanges(humidityToLoction));

  const locations = locationRanges.map((range) => {
    return range[0];
  });

  return Math.min(...locations);
};

const expectedSecondSolution = 46;

export { first, expectedFirstSolution, second, expectedSecondSolution };
