import genDiff from '../src/diffGenerator.js';

describe('Diff Generator', () => {

  it('should return correct diff when new keys', () => {
    expect(genDiff({}, { a: 1 })).toStrictEqual({
      added: [{ a: 1 }],
      removed: [],
      updated: [],
      untouched: [],
    });
  });

  it('should return correct diff when updated keys', () => {
    expect(genDiff({ a: 1 }, { a: 2 })).toStrictEqual({
      added: [],
      removed: [],
      updated: [{ a: { from: 1, to: 2 } }],
      untouched: [],
    });
  });

  it('should return correct diff when removed keys', () => {
    expect(genDiff({ a: 1 }, { })).toStrictEqual({
      added: [],
      removed: [{ a: 1 }],
      updated: [],
      untouched: [],
    });
  });

  it('should return correct diff when untouched keys', () => {
    expect(genDiff({ a: 1 }, { a: 1 })).toStrictEqual({
      added: [],
      removed: [],
      updated: [],
      untouched: [{ a: 1 }],
    });
  });

});
