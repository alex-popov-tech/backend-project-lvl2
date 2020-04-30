import { genDiffString } from '../src/index.js';

const differenceOutput = '{'
  + '\n\t+ verbose: true'
  + '\n\t+ timeout: 20'
  + '\n\t- timeout: 50'
  + '\n\t- proxy: 123.234.53.22'
  + '\n\t- follow: false'
  + '\n\t  host: hexlet.io'
  + '\n}';

[
  { from: 'JSON', to: 'YAML', before: 'fixtures/before-flat.json', after: 'fixtures/after-flat.yml' },
  { from: 'YAML', to: 'INI', before: 'fixtures/before-flat.yml', after: 'fixtures/after-flat.ini' },
].forEach(({ from, to, before, after }) => test(`gendiff compares ${from} to ${to}`, () => {
  const result = genDiffString(before, after);
  expect(result).toEqual(differenceOutput);
}));
