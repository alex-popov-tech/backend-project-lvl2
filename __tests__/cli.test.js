import { readFileSync } from 'fs';
import { genDiffString } from '../src/index.js';

[
  {
    format: 'json',
    from: { path: 'fixtures/before.json', type: 'JSON' },
    to: { path: 'fixtures/after.json', type: 'JSON' },
    output: readFileSync('fixtures/json_output').toString().trim(),
  },
  {
    format: 'pretty',
    from: { path: 'fixtures/before.json', type: 'JSON' },
    to: { path: 'fixtures/after.yml', type: 'YAML' },
    output: readFileSync('fixtures/pretty_output').toString().trim(),
  },
  {
    format: 'plain',
    from: { path: 'fixtures/before.yml', type: 'YAML' },
    to: { path: 'fixtures/after.ini', type: 'INI' },
    output: readFileSync('fixtures/plain_output').toString().trim(),
  },
].forEach(({ format, from, to, output }) => {
  test(`genDiff provides correct differences in "${format}" between "${from.type}" and "${to.type}"`, () => {
    expect(genDiffString(from.path, to.path, format))
      .toEqual(output);
  });
})
