import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import generateDifferences from './diffGenerator.js';
import parse from './parser.js';
import formatDifferences from './formatters/index.js';

const readFile = (path) => {
  const absolutePath = resolve(process.cwd(), path);
  return readFileSync(absolutePath);
};

export default (firstFilePath, secondFilePath, format) => {
  const firstBuffer = readFile(firstFilePath);
  const secondBuffer = readFile(secondFilePath);
  const firstObject = parse(firstBuffer, extname(firstFilePath));
  const secondObject = parse(secondBuffer, extname(secondFilePath));
  const diff = generateDifferences(firstObject, secondObject);
  return formatDifferences(diff, format);
};
