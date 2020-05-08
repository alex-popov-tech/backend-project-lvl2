import _ from 'lodash';

const indentFor = (level) => '  '.repeat(level);

const stringify = (name, entity, deep) => {
  if (!_.isObject(entity)) {
    return `${name}: ${entity}`;
  }
  const fields = Object.entries(entity)
    .map(([key, value]) => `${indentFor(deep + 2)}  ${key}: ${value}`)
    .join('\n');
  return `${name}: {\n${fields}\n${indentFor(deep)}  }`;
};

const format = (differences, deep = 1) => {
  const result = differences.map(({
    name,
    value,
    type,
    children,
  }) => {
    const currentIndent = indentFor(deep);
    switch (type) {
      case 'added': {
        return `${currentIndent}+ ${stringify(name, value, deep)}`;
      }
      case 'removed': {
        return `${currentIndent}- ${stringify(name, value, deep)}`;
      }
      case 'changed': {
        const before = `${currentIndent}- ${stringify(name, value.before, deep)}`;
        const after = `${currentIndent}+ ${stringify(name, value.after, deep)}`;
        return `${after}\n${before}`;
      }
      case 'nested': {
        return `${currentIndent}  ${name}: ${format(children, deep + 2)}`;
      }
      default: {
        return `${currentIndent}  ${stringify(name, value, deep)}`;
      }
    }
  }).join('\n');
  return `{\n${result}\n${indentFor(deep - 1)}}`;
};

export default format;
