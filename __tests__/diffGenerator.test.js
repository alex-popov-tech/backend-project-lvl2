import genDiff from '../src/diffGenerator.js';


test('should return correct diff object when comparing deep objects', () => {
  const before = {
    a: 1,
    b: true,
    c: 'three',
    deep: {
      a: 1,
      b:
        true,
      c: 'three',
    },
  };
  const after = {
    b: false,
    c: 'three',
    deep: {
      b: false,
      c: 'three',
    },
  };
  expect(genDiff(before, after)).toEqual([
    { name: 'a', type: 'removed', value: 1 },
    { name: 'b', type: 'changed', value: { before: true, after: false } },
    { name: 'c', type: 'unchanged', value: 'three' },
    {
      name: 'deep',
      type: 'nested',
      children: [
        { name: 'a', type: 'removed', value: 1 },
        { name: 'b', type: 'changed', value: { before: true, after: false } },
        { name: 'c', type: 'unchanged', value: 'three' },
      ],
    },
  ]);
});
