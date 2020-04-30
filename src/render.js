const stringify = (diffObject, space = '\n\t', name = '') => {
  const result = [
    ...diffObject.added.map(({ key, value }) => ({ [`+ ${key}`]: value })),
    ...diffObject.updated.filter(({ value }) => !value).map(({ key, to }) => ({ [`+ ${key}`]: to })),
    ...diffObject.updated.filter(({ value }) => !value).map(({ key, from }) => ({ [`- ${key}`]: from })),
    // ...diffObject.updated.filter((it) => it.value).map((it) => stringify(it.value, `${space}\t`, `  ${it.key}: `)),
    ...diffObject.removed.map(({ key, value }) => ({ [`- ${key}`]: value })),
    ...diffObject.untouched.map(({ key, value }) => ({ [`  ${key}`]: value })),
  ].reduce((acc, it) => ({ ...acc, ...it }), {});
  return JSON.stringify(result, null, '\t').replace(/[",]/g, '');
};
export default stringify;
