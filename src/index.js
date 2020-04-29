import genDiff from './diffGenerator.js';
import parse from './parser.js';

const printDiffs = (diff) => {
  const results = [
    ...diff.added.map((it) => `+ ${it.key} ${it.value}`),
    ...diff.updated.map((it) => `+ ${it.key} ${it.value.to}\n- ${it.key} ${it.value.from}`),
    ...diff.removed.map((it) => `- ${it.key} ${it.value}`),
    ...diff.untouched.map((it) => `  ${it.key} ${it.value}`),
  ];
  console.log(`{\n${results.join('\n')}\n}`);
};

export default (firstFilePath, secondFilePath) => {
  const [firstObject, secondObject] = [parse(firstFilePath), parse(secondFilePath)];
  const diff = genDiff(firstObject, secondObject);
  printDiffs(diff);
};
