import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import generateDifferences from './diffGenerator.js';
import formatDifferences from './formatters/index.js';
import parse from './parser.js';

const readFile = (path) => {
  const absolutePath = resolve(process.cwd(), path);
  const content = readFileSync(absolutePath).toString();
  const format = extname(absolutePath).substr(1);
  return { content, format };
};

export default (firstFilePath, secondFilePath, formatName) => {
  const firstFileData = readFile(firstFilePath);
  const secondFileData = readFile(secondFilePath);
  const firstObject = parse(firstFileData);
  const secondObject = parse(secondFileData);
  const differences = generateDifferences(firstObject, secondObject);
  return formatDifferences(differences, formatName);
};
