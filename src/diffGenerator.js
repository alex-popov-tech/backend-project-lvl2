import _ from 'lodash';

const generateDifferences = (before, after) => _.union(_.keys(before), _.keys(after))
  .sort()
  .map((key) => ({
    name: key,
    beforeValue: before[key],
    afterValue: after[key],
  })).map(({ name, beforeValue, afterValue }) => {
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
