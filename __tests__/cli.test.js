import { genDiffString } from '../src/index.js';


[
  { format: 'json', from: 'JSON', to: 'YAML', before: 'fixtures/flat/before.json', after: 'fixtures/flat/after.yml' },
  { format: 'json', from: 'YAML', to: 'INI', before: 'fixtures/flat/before.yml', after: 'fixtures/flat/after.ini' },
].forEach(({ format, from, to, before, after }) => test(`gendiff formats flat ${from} to ${to} in ${format}`, () => {
  const differenceOutput = '{'
    + '\n\t"- follow": false,'
    + '\n\t"  host": "hexlet.io",'
    + '\n\t"- proxy": "123.234.53.22",'
    + '\n\t"+ timeout": 20,'
    + '\n\t"- timeout": 50,'
    + '\n\t"+ verbose": true'
    + '\n}';
  const result = genDiffString(before, after, format);
  expect(result).toEqual(differenceOutput);
}));

[
  { format: 'plain', from: 'JSON', to: 'YAML', before: 'fixtures/flat/before.json', after: 'fixtures/flat/after.yml' },
  { format: 'plain', from: 'YAML', to: 'INI', before: 'fixtures/flat/before.yml', after: 'fixtures/flat/after.ini' },
].forEach(({ format, from, to, before, after }) => test(`gendiff formats flat ${from} to ${to} in ${format}`, () => {
  const differenceOutput =
    'Property "follow" was deleted'
    + '\nProperty "proxy" was deleted'
    + '\nProperty "timeout" was changed from 50 to 20'
    + '\nProperty "verbose" was added with value true';
  const result = genDiffString(before, after, format);
  expect(result).toEqual(differenceOutput);
}));

[
  { format: 'json', from: 'JSON', to: 'YAML', before: 'fixtures/deep/before.json', after: 'fixtures/deep/after.json' },
  // { from: 'YAML', to: 'INI', before: 'fixtures/deep/before.yml', after: 'fixtures/deep/after.ini' },
].forEach(({ format, from, to, before, after }) => test(`gendiff compares deep ${from} to ${to} in ${format}`, () => {
  const differenceOutput = '{'
    + '\n\t"common": {'
    + '\n\t\t"+ follow": false,'
    + '\n\t\t"  setting1": "Value 1",'
    + '\n\t\t"- setting2": 200,'
    + '\n\t\t"+ setting3": {'
    + '\n\t\t\t"key": "value"'
    + '\n\t\t},'
    + '\n\t\t"- setting3": true,'
    + '\n\t\t"+ setting4": "blah blah",'
    + '\n\t\t"+ setting5": {'
    + '\n\t\t\t"key5": "value5"'
    + '\n\t\t},'
    + '\n\t\t"setting6": {'
    + '\n\t\t\t"  key": "value",'
    + '\n\t\t\t"+ ops": "vops"'
    + '\n\t\t}'
    + '\n\t},'
    + '\n\t"group1": {'
    + '\n\t\t"+ baz": "bars",'
    + '\n\t\t"- baz": "bas",'
    + '\n\t\t"  foo": "bar",'
    + '\n\t\t"+ nest": "str",'
    + '\n\t\t"- nest": {'
    + '\n\t\t\t"key": "value"'
    + '\n\t\t}'
    + '\n\t},'
    + '\n\t"- group2": {'
    + '\n\t\t"abc": 12345'
    + '\n\t},'
    + '\n\t"+ group3": {'
    + '\n\t\t"fee": 100500'
    + '\n\t}'
    + '\n}';
  const result = genDiffString(before, after, format);
  expect(result).toEqual(differenceOutput);
}));

[
  { format: 'plain', from: 'JSON', to: 'YAML', before: 'fixtures/deep/before.json', after: 'fixtures/deep/after.json' },
  // { from: 'YAML', to: 'INI', before: 'fixtures/deep/before.yml', after: 'fixtures/deep/after.ini' },
].forEach(({ format, from, to, before, after }) => test(`gendiff compares deep ${from} to ${to} in ${format}`, () => {
  const differenceOutput =
    'Property "common.follow" was added with value false'
    + '\nProperty "common.setting2" was deleted'
    + '\nProperty "common.setting3" was changed from true to [complex value]'
    + '\nProperty "common.setting4" was added with value "blah blah"'
    + '\nProperty "common.setting5" was added with value [complex value]'
    + '\nProperty "common.setting6.ops" was added with value "vops"'
    + '\nProperty "group1.baz" was changed from "bas" to "bars"'
    + '\nProperty "group1.nest" was changed from [complex value] to "str"'
    + '\nProperty "group2" was deleted'
    + '\nProperty "group3" was added with value [complex value]'
    + '';
  const result = genDiffString(before, after, format);
  expect(result).toEqual(differenceOutput);
}));

