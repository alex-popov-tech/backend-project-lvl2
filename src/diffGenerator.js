import _ from 'lodash';

const {
  union,
  difference,
  keys,
} = _;

export default (firstObject, secondObject) => {
  const firstObjectKeys = keys(firstObject);
  const secondObjectKeys = keys(secondObject);
  const addedKeys = secondObjectKeys.filter((skey) => !firstObjectKeys.includes(skey));
  const updatedKeys = secondObjectKeys.filter(
    (skey) => firstObject[skey] !== undefined && firstObject[skey] !== secondObject[skey],
  );
  const removedKeys = firstObjectKeys.filter((fkey) => !secondObjectKeys.includes(fkey));
  const untouchedKeys = difference(
    union(firstObjectKeys, secondObjectKeys), union(addedKeys, updatedKeys, removedKeys),
  );

  return {
    added: addedKeys.map((key) => ({ key, value: secondObject[key] })),
    removed: removedKeys.map((key) => ({ key, value: firstObject[key] })),
    updated: updatedKeys.map(
      (key) => ({ key, value: { from: firstObject[key], to: secondObject[key] } }),
    ),
    untouched: untouchedKeys.map((key) => ({ key, value: firstObject[key] })),
  };
};
