const indention = (level) => '  '.repeat(level);

const stringify = (name, entity, indentionLevel) => {
  if (typeof entity !== 'object') {
    return `${name}: ${entity}`;
  }
  const fields = Object.entries(entity)
    .map(([key, value]) => `${indention(indentionLevel + 2)}  ${key}: ${value}`)
    .join('\n');
  return `${name}: {\n${fields}\n${indention(indentionLevel)}  }`;
};

const transformDiffs = (diffs, indentionLevel) => {
  const result = diffs.map(({
    name,
    value,
    type,
    children,
  }) => {
    const indent = indention(indentionLevel);
    switch (type) {
      case 'added': {
        return `${indent}+ ${stringify(name, value, indentionLevel)}`;
      }
      case 'removed': {
        return `${indent}- ${stringify(name, value, indentionLevel)}`;
      }
      case 'changed': {
        const before = `${indent}- ${stringify(name, value.before, indentionLevel)}`;
        const after = `${indent}+ ${stringify(name, value.after, indentionLevel)}`;
        return `${after}\n${before}`;
      }
      case 'parent': {
        return `${indent}  ${name}: ${transformDiffs(children, indentionLevel + 2)}`;
      }
      default: {
        return `${indent}  ${stringify(name, value, indentionLevel)}`;
      }
    }
  }).join('\n');
  return `{\n${result}\n${indention(indentionLevel - 1)}}`;
};

export default (diffs) => transformDiffs(diffs, 1);
