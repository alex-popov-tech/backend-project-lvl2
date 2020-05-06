import { readFileSync } from 'fs';
import generateFormattedDifferences from '../src/index.js';

[
  {
    format: 'pretty',
    from: { path: 'fixtures/before.json', type: 'JSON' },
    to: { path: 'fixtures/after.yml', type: 'YAML' },
    expected: readFileSync('fixtures/expected.pretty').toString().trim(),
  },
  {
    format: 'json',
    from: { path: 'fixtures/before.json', type: 'JSON' },
    to: { path: 'fixtures/after.json', type: 'JSON' },
    expected: readFileSync('fixtures/expected.json').toString().trim(),
  },
  {
    format: 'plain',
    from: { path: 'fixtures/before.yml', type: 'YAML' },
    to: { path: 'fixtures/after.ini', type: 'INI' },
    expected: readFileSync('fixtures/expected.plain').toString().trim(),
  },
].forEach(({
  format,
  from,
  to,
  expected,
}) => {
  test(`genDiff provides correct differences in "${format}" between "${from.type}" and "${to.type}"`, () => {
    expect(generateFormattedDifferences(from.path, to.path, format)).toEqual(expected);
  });
});
