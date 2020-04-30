import genDiff from './diffGenerator.js';
import parse from './parser.js';
import render from './render.js';

export const genDiffString = (firstFilePath, secondFilePath) => {
  const [firstObject, secondObject] = [parse(firstFilePath), parse(secondFilePath)];
  const diff = genDiff(firstObject, secondObject);
  return render(diff);
};

export default (firstFilePath, secondFilePath) => {
  const output = genDiffString(firstFilePath, secondFilePath);
  console.log(output);
};
