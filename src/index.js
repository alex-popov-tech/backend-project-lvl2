import genDiff from './diffGenerator.js';
import parse from './parser.js';
import stringifyDiffs from './formatters';


export default (firstFilePath, secondFilePath, format) => {
  const [firstObject, secondObject] = [parse(firstFilePath), parse(secondFilePath)];
  const diff = genDiff(firstObject, secondObject);
  return stringifyDiffs(diff, format);
};
