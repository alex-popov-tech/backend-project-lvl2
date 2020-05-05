import _ from 'lodash';

const generateDifferences = (beforeObject, afterObject) => _.union(
  _.keys(beforeObject),
  _.keys(afterObject),
).sort()
  .map((name) => {
    const beforeValue = beforeObject[name];
    const afterValue = afterObject[name];
    if (typeof beforeValue === 'object' && typeof afterValue === 'object') {
      return {
        name,
        type: 'parent',
        children: generateDifferences(beforeValue, afterValue),
      };
    }
    if (beforeValue === afterValue) {
      return {
        name,
        type: 'unchanged',
        value: afterValue,
      };
    }
    if (beforeValue === undefined) {
      return {
        name,
        type: 'added',
        value: afterValue,
      };
    }
    if (afterValue === undefined) {
      return {
        name,
        type: 'removed',
        value: beforeValue,
      };
    }
    return {
      name,
      type: 'changed',
      value: {
        before: beforeValue,
        after: afterValue,
      },
    };
  });

export default generateDifferences;
