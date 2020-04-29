import parse from '../src/parser.js';

describe('Parser', () => {

  [
    { type: 'JSON', path: 'fixtures/before-flat.json' },
    { type: 'YAML', path: 'fixtures/before-flat.yml' },
    { type: 'INI', path: 'fixtures/before-flat.ini' },
  ].forEach(({ type, path }) => it(`should parse ${type} file`, () => {
    expect(parse(path)).toStrictEqual({
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22",
      follow: false,
    });
  }))

  it('should throw error on unsupported format', () => {
    expect(() => parse('README.md')).toThrowError('Invalid extension used - ".md"');
  });

});
