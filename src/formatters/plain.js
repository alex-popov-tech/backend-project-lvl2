/* eslint-disable no-restricted-syntax */
const toString = (obj) => (typeof obj === 'object')
  ? '[complex value]'
  : (typeof obj === 'string')
    ? `"${obj}"`
    : obj;

const stringifyDiffs = (diffs, path) => {
  const result = [];
  for (const { name, from, to, childs } of diffs) {
    if (childs) {
      result.push(stringifyDiffs(childs, `${path}${name}.`));
    } else if (from === undefined) {
      result.push(`Property "${path}${name}" was added with value ${toString(to)}`);
    } else if (to === undefined) {
      result.push(`Property "${path}${name}" was deleted`);
    } else if (to !== from) {
      result.push(`Property "${path}${name}" was changed from ${toString(from)} to ${toString(to)}`);
    }
  }
  return result.join('\n');
};

export default (diff) => stringifyDiffs(diff, '');
