import _ from 'lodash';

const stringify = (entity) => {
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
  switch (type) {
    case 'parent': {
      return stringifyDiffs(children, `${path}${name}.`);
    }
    case 'added': {
      return `Property "${path}${name}" was added with value ${stringify(value)}`;
    }
    case 'removed': {
      return `Property "${path}${name}" was deleted`;
    }
    case 'changed': {
      return `Property "${path}${name}" was changed from ${stringify(value.before)} to ${stringify(value.after)}`;
    }
    default: {
      return null;
    }
  }
})
  .filter(_.identity)
  .join('\n');

export default (diff) => stringifyDiffs(diff, '');
