import parse from '../src/parser.js';

describe('Parser', () => {

  it('should parse JSON object', () => {
    expect(parse('fixtures/before-flat.json')).toStrictEqual({
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22",
      follow: false,
    });
  });

  it('should parse YAML object', () => {
    expect(parse('fixtures/before-flat.yml')).toStrictEqual({
      host: "hexlet.io",
      timeout: 50,
      proxy: "123.234.53.22",
      follow: false,
    });
  });

  it('should throw error on unsupported format', () => {
    expect(() => parse('README.md')).toThrowError('Invalid extension used - ".md"');
  });

});
