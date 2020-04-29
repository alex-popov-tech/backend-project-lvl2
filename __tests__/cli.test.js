import genDiff from '../src/index.js';

const spy = jest.spyOn(console, 'log').mockImplementation();
const differenceOutput = '{\n'
  + '+ verbose true\n'
  + '+ timeout 20\n'
  + '- timeout 50\n'
  + '- proxy 123.234.53.22\n'
  + '- follow false\n'
  + '  host hexlet.io\n'
  + '}';

[
  { from: 'JSON', to: 'JSON', before: 'fixtures/before-flat.json', after: 'fixtures/after-flat.json' },
  { from: 'YAML', to: 'YAML', before: 'fixtures/before-flat.yml', after: 'fixtures/after-flat.yml' },
  { from: 'JSON', to: 'YAML', before: 'fixtures/before-flat.json', after: 'fixtures/after-flat.yml' },
  { from: 'INI', to: 'INI', before: 'fixtures/before-flat.ini', after: 'fixtures/after-flat.ini' },
  { from: 'INI', to: 'JSON', before: 'fixtures/before-flat.ini', after: 'fixtures/after-flat.json' },
  { from: 'INI', to: 'YAML', before: 'fixtures/before-flat.ini', after: 'fixtures/after-flat.yml' },
].forEach(({ from, to, before, after }) => test(`gendiff compares ${from} to ${to}`, () => {
  genDiff(before, after);
  expect(spy).toHaveBeenLastCalledWith(differenceOutput);
}));
