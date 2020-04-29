import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'path';

const {
  union,
  difference,
  keys,
} = _;

const toString = (firstFilePath, secondFilePath) => {
  const absoluteFirstFilePath = resolve(process.cwd(), firstFilePath);
  const absoluteSecondFilePath = resolve(process.cwd(), secondFilePath);
  return {
    firstString: readFileSync(absoluteFirstFilePath).toString(),
    secondString: readFileSync(absoluteSecondFilePath).toString(),
  };
};

const toObjects = (firstText, secondText) => ({
  firstObject: JSON.parse(firstText),
  secondObject: JSON.parse(secondText),
});

export const genDiff = (firstObject, secondObject) => {
  const firstKeys = keys(firstObject);
  const secondKeys = keys(secondObject);
  const added = secondKeys.filter((skey) => !firstKeys.includes(skey));
  const updated = secondKeys.filter(
    (skey) => firstObject[skey] !== undefined && firstObject[skey] !== secondObject[skey],
  );
  const removed = firstKeys.filter((fkey) => !secondKeys.includes(fkey));
  const untouched = difference(union(firstKeys, secondKeys), union(added, updated, removed));

  return {
    added: added.map((key) => ({ [key]: secondObject[key] })),
    removed: removed.map((key) => ({ [key]: firstObject[key] })),
    updated: updated.map((key) => ({ [key]: { from: firstObject[key], to: secondObject[key] } })),
    untouched: untouched.map((key) => ({ [key]: firstObject[key] })),
  };
};

export default (firstFilePath, secondFilePath, format) => {
  const { firstString, secondString } = toString(firstFilePath, secondFilePath);
  const { firstObject, secondObject } = toObjects(firstString, secondString, format);
  return genDiff(firstObject, secondObject);
};
