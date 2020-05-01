const stringify = (diffs) => {
  const result = {};
  for (const { name, from, to, childs } of diffs) {
    if (childs) {
      result[name] = stringify(diffs);
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
  }
  return result;
};
export default (diffs) => JSON.stringify(stringify(diffs), null, '\t').replace(/[",]/g, '');
