import _ from 'lodash';

const generateDifferences = (before, after) => _.union(_.keys(before), _.keys(after))
  .sort()
  .map((key) => {
    if (!_.has(before, key)) {
      return {
        name: key,
        type: 'added',
        value: after[key],
      };
    }
    if (!_.has(after, key)) {
      return {
        name: key,
        type: 'removed',
        value: before[key],
      };
    }
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return {
        name: key,
        type: 'nested',
        children: generateDifferences(before[key], after[key]),
      };
    }
    if (before[key] === after[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: after[key],
      };
    }
    return {
      name: key,
      type: 'changed',
      value: {
        before: before[key],
        after: after[key],
      },
    };
  });

export default generateDifferences;
