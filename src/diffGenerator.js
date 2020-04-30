import _ from 'lodash';

const {
  union,
  difference,
  keys,
} = _;

const genDiff = (firstObject, secondObject) => {
  const firstObjectKeys = keys(firstObject);
  const secondObjectKeys = keys(secondObject);

  const addedKeys = secondObjectKeys.filter((skey) => !firstObjectKeys.includes(skey));
  const updatedKeys = secondObjectKeys.filter((skey) => firstObject[skey] !== undefined && firstObject[skey] !== secondObject[skey]);
  const removedKeys = firstObjectKeys.filter((fkey) => !secondObjectKeys.includes(fkey));
  const untouchedKeys = difference(union(firstObjectKeys, secondObjectKeys), union(addedKeys, updatedKeys, removedKeys));

  const added = addedKeys.map((key) => ({ key, value: secondObject[key] }));
  const removed = removedKeys.map((key) => ({ key, value: firstObject[key] }));
  const untouched = untouchedKeys.map((key) => ({ key, value: firstObject[key] }));
  const updated = updatedKeys.map((key) => (typeof firstObject[key] !== 'object' ? ({ key, from: firstObject[key], to: secondObject[key] }) : ({ key, value: genDiff(firstObject[key], secondObject[key]) })));
  // const updated = updatedKeys.map((key) => (typeof firstObject[key] !== 'object' ? ({ key, from: firstObject[key], to: secondObject[key] }) : ({ key, value: null })));

  return {
    added,
    removed,
    untouched,
    updated,
  };
};

export default genDiff;
