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

const stringifyDiffs = (diffs, path) => {
  const result = [];
  diffs.forEach(({
    name,
    from,
    to,
    childs,
  }) => {
    if (childs) {
      result.push(stringifyDiffs(childs, `${path}${name}.`));
    } else if (from === undefined) {
      result.push(`Property "${path}${name}" was added with value ${toString(to)}`);
    } else if (to === undefined) {
      result.push(`Property "${path}${name}" was deleted`);
    } else if (to !== from) {
      result.push(`Property "${path}${name}" was changed from ${toString(from)} to ${toString(to)}`);
    }
  });
  return result.join('\n');
};

export default (diff) => stringifyDiffs(diff, '');
