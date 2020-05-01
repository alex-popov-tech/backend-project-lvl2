import _ from 'lodash';


const genDiff = (firstObject, secondObject) => {
  const keys = _.union(_.keys(firstObject), _.keys(secondObject)).sort();
  const result = [];
  for (const key of keys) {
    const from = firstObject[key];
    const to = secondObject[key];
    if (typeof from === 'object' && typeof to === 'object') {
      result.push({
        name: key,
        childs: genDiff(firstObject[key], secondObject[key]),
      });
    } else {
      result.push({
        name: key,
        from,
        to,
      });
    }
  }
  return result;
};

export default genDiff;
