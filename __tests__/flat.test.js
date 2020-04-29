import { genDiff } from '../src/index.js';

describe('Flat', () => {
  it('should return correct diff with new/updated/removed/untouched keys', () => {
    expect(genDiff({ a: 1, b: 2, c: 3 }, { b: 2, c: 4, d: 5 }))
      .toStrictEqual({ added: [{ d: 5 }], removed: [{ a: 1 }], updated: [{ c: { from: 3, to: 4 } }], untouched: [{ b: 2 }] });
  });
});
