const indentFor = (level) => '  '.repeat(level);

const stringify = (name, entity, indentionLevel) => {
  if (typeof entity !== 'object') {
    return `${name}: ${entity}`;
  }
  const fields = Object.entries(entity)
    .map(([key, value]) => `${indentFor(indentionLevel + 2)}  ${key}: ${value}`)
    .join('\n');
  return `${name}: {\n${fields}\n${indentFor(indentionLevel)}  }`;
};

const format = (differences, indentionLevel = 1) => {
  const result = differences.map(({
    name,
    value,
    type,
    children,
  }) => {
    const currentIndent = indentFor(indentionLevel);
    switch (type) {
      case 'added': {
        return `${currentIndent}+ ${stringify(name, value, indentionLevel)}`;
      }
      case 'removed': {
        return `${currentIndent}- ${stringify(name, value, indentionLevel)}`;
      }
      case 'changed': {
        const before = `${currentIndent}- ${stringify(name, value.before, indentionLevel)}`;
        const after = `${currentIndent}+ ${stringify(name, value.after, indentionLevel)}`;
        return `${after}\n${before}`;
      }
      case 'parent': {
        return `${currentIndent}  ${name}: ${format(children, indentionLevel + 2)}`;
      }
      default: {
        return `${currentIndent}  ${stringify(name, value, indentionLevel)}`;
      }
    }
  }).join('\n');
  return `{\n${result}\n${indentFor(indentionLevel - 1)}}`;
};

export default format;
