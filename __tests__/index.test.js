import { readFileSync } from 'fs';
import generateFormattedDifferences from '../src/index.js';

let expectedPretty;
let expectedJson;
let expectedPlain;

beforeAll(() => {
  expectedPretty = readFileSync('fixtures/expected.pretty').toString().trim();
  expectedJson = readFileSync('fixtures/expected.json').toString().trim();
  expectedPlain = readFileSync('fixtures/expected.plain').toString().trim();
});

const fixtureFor = (filePath) => `fixtures/${filePath}`;

test.each([
  'json',
  'yml',
  'ini',
])('genDiff provides correct differences for "%s"', (format) => {
  const beforeFilePath = fixtureFor(`before.${format}`);
  const afterFilePath = fixtureFor(`after.${format}`);
  expect(generateFormattedDifferences(beforeFilePath, afterFilePath, 'pretty'))
    .toEqual(expectedPretty);
  expect(generateFormattedDifferences(beforeFilePath, afterFilePath, 'plain'))
    .toEqual(expectedPlain);
  expect(generateFormattedDifferences(beforeFilePath, afterFilePath, 'json'))
    .toEqual(expectedJson);
});
