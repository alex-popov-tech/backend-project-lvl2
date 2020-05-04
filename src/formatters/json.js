const INDENTION_LEVEL = ' '.repeat(2);
export default (diffs) => JSON.stringify(diffs, null, INDENTION_LEVEL);
