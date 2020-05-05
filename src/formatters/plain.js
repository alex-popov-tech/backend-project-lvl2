import _ from 'lodash';

const toString = (entity) => {
  switch (typeof entity) {
    case 'object': {
      return '[complex value]';
    }
    case 'string': {
      return `"${entity}"`;
    }
    default: {
      return entity;
    }
  }
};

const stringifyDiffs = (diffs, path) => diffs.map(({
  name,
  value,
  type,
  children,
}) => {
  if ('parent' === type) {
    return stringifyDiffs(children, `${path}${name}.`);
  }
  if ('added' === type) {
    return `Property "${path}${name}" was added with value ${toString(value)}`;
  }
  if ('removed' === type) {
    return `Property "${path}${name}" was deleted`;
  }
  if ('changed' === type) {
    return `Property "${path}${name}" was changed from ${toString(value.before)} to ${toString(value.after)}`;
  }
  return null;
})
  .filter(_.identity)
  .join('\n');

export default (diff) => stringifyDiffs(diff, '');
