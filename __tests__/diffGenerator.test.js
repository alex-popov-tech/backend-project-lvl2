import genDiff from '../src/diffGenerator.js';


test('should return correct diff object when comparing flat objects', () => {
  const before = {
    a: 1,
    b: true,
    c: 'three',
    e: {},
  };
  const after = {
    b: false,
    c: 'three',
    d: 'new',
    f: {},
  };
  expect(genDiff(before, after)).toEqual([
    {
      name: 'a',
      from: 1,
      to: undefined,
    }, {
      name: 'b',
      from: true,
      to: false,
    }, {
      name: 'c',
      from: 'three',
      to: 'three',
    }, {
      name: 'd',
      from: undefined,
      to: 'new',
    }, {
      name: 'e',
      from: {},
      to: undefined,
    }, {
      name: 'f',
      from: undefined,
      to: {},
    },
  ]);
});


test('should return correct diff object when comparing deep objects', () => {
  const before = {
    key: {
      a: 1,
      b: true,
      c: 'three',
      e: {},
    },
  };
  const after = {
    key: {
      b: false,
      c: 'three',
      d: 'new',
      f: {},
    },
  };
  expect(genDiff(before, after)).toEqual([
    {
      name: 'key',
      childs: [
        {
          name: 'a',
          from: 1,
          to: undefined,
        }, {
          name: 'b',
          from: true,
          to: false,
        }, {
          name: 'c',
          from: 'three',
          to: 'three',
        }, {
          name: 'd',
          from: undefined,
          to: 'new',
        }, {
          name: 'e',
          from: {},
          to: undefined,
        }, {
          name: 'f',
          from: undefined,
          to: {},
        },
      ],
    },
  ]);
});
