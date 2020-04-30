import genDiff from '../src/diffGenerator.js';

const before = {
  a: 1, b: true, c: 'three', e: {},
  gr: {
    a: 1, b: true, c: 'three', e: {},
    dgr: {
      a: 1, b: true, c: 'three', e: {},
    },
  },
};

const after = {
  b: false, c: 'three', d: 'new', f: {},
  gr: {
    b: false, c: 'three', d: 'new', f: {},
    dgr: {
      b: false, c: 'three', d: 'new', f: {},
    },
  },
};

test('should return correct diff object when comparing deep objects', () => {
  expect(genDiff(before, after)).toEqual({
    added: [{ key: 'd', value: 'new' }, { key: 'f', value: {} }],
    removed: [{ key: 'a', value: 1 }, { key: 'e', value: {} }],
    untouched: [{ key: 'c', value: 'three' }],
    updated: [{ key: 'b', from: true, to: false }, {
      key: 'gr',
      value: {
        added: [{ key: 'd', value: 'new' }, { key: 'f', value: {} }],
        removed: [{ key: 'a', value: 1 }, { key: 'e', value: {} }],
        untouched: [{ key: 'c', value: 'three' }],
        updated: [{ key: 'b', from: true, to: false }, {
          key: 'dgr',
          value: {
            added: [{ key: 'd', value: 'new' }, { key: 'f', value: {} }],
            removed: [{ key: 'a', value: 1 }, { key: 'e', value: {} }],
            untouched: [{ key: 'c', value: 'three' }],
            updated: [{ key: 'b', from: true, to: false }],
          },
        }],
      },
    }],
  });
});
