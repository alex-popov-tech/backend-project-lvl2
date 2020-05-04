const transformDiffs = (diffs) => {
  const result = {};
  diffs.forEach(({
    name,
    from,
    to,
    childs,
  }) => {
    if (childs) {
      result[`  ${name}`] = transformDiffs(childs);
    } else if (from === undefined) {
      result[`+ ${name}`] = to;
    } else if (to === undefined) {
      result[`- ${name}`] = from;
    } else if (to === from) {
      result[`  ${name}`] = from;
    } else {
      result[`+ ${name}`] = to;
      result[`- ${name}`] = from;
    }
  });
  return result;
};

const INDENT = ' '.repeat(2);

export default (diffs) => {
  const result = transformDiffs(diffs);
  const json = JSON.stringify(result, null, INDENT)
    .replace(/[",]/g, '');
  return json;
};
