import genDiff from './diffGenerator.js';
import parse from './parser.js';

export default (firstFilePath, secondFilePath) => {
  const [firstObject, secondObject] = [parse(firstFilePath), parse(secondFilePath)];
  return genDiff(firstObject, secondObject);
};
