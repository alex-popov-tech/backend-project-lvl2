import _ from 'lodash';

const indentFor = (level) => '  '.repeat(level);

const stringify = (entity, deep) => {
  if (!_.isObject(entity)) {
    return entity;
  }
  const fields = Object.entries(entity)
    .map(([key, value]) => `${indentFor(deep + 2)}  ${key}: ${value}`)
    .join('\n');
  return `{\n${fields}\n${indentFor(deep)}  }`;
};

const format = (differences, deep = 1) => {
  const result = differences.map(({
    name,
    value,
    type,
    children,
  }) => {
    const currentDeep = indentFor(deep);
    switch (type) {
      case 'added': {
        return `${currentDeep}+ ${name}: ${stringify(value, deep)}`;
      }
      case 'removed': {
        return `${currentDeep}- ${name}: ${stringify(value, deep)}`;
      }
      case 'changed': {
        const before = `${currentDeep}- ${name}: ${stringify(value.before, deep)}`;
        const after = `${currentDeep}+ ${name}: ${stringify(value.after, deep)}`;
        return `${after}\n${before}`;
      }
      case 'nested': {
        return `${currentDeep}  ${name}: ${format(children, deep + 2)}`;
      }
      default: {
        return `${currentDeep}  ${name}: ${stringify(value, deep)}`;
      }
    }
  }).join('\n');
  return `{\n${result}\n${indentFor(deep - 1)}}`;
};

export default format;
