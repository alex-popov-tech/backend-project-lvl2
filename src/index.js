import genDiff from './diffGenerator.js';
import parse from './parser.js';
import stringifyDiffs from './formatters/index.js';


export const genDiffString = (firstFilePath, secondFilePath, format) => {
  const [firstObject, secondObject] = [parse(firstFilePath), parse(secondFilePath)];
  const diff = genDiff(firstObject, secondObject);
  return stringifyDiffs(diff, format);
};

export default (firstFilePath, secondFilePath, format) => {
  console.log(genDiffString(firstFilePath, secondFilePath, format));
};
