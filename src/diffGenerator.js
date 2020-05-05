import _ from 'lodash';


const genDiff = (firstObject, secondObject) => _.union(_.keys(firstObject), _.keys(secondObject))
  .sort()
  .map((key) => {
    const before = firstObject[key];
    const after = secondObject[key];
    if (typeof before === 'object' && typeof after === 'object') {
      return {
        name: key,
        type: 'parent',
        children: genDiff(firstObject[key], secondObject[key]),
      };
    }
    if (before === after) {
      return {
        name: key,
        type: 'unchanged',
        value: after,
      };
    }
    if (before === undefined) {
      return {
        name: key,
        type: 'added',
        value: after,
      };
    }
    if (after === undefined) {
      return {
        name: key,
        type: 'removed',
        value: before,
      };
    }
    return {
      name: key,
      type: 'changed',
      value: {
        before,
        after,
      },
    };
  });

export default genDiff;
