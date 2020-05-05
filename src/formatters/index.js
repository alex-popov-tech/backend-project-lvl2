import formatAsJson from './json.js';
import formatAsPlain from './plain.js';
import formatAsPretty from './pretty.js';

export default (diffs, format) => {
  switch (format.toLowerCase()) {
    case 'json': {
      return formatAsJson(diffs);
    }
    case 'plain': {
      return formatAsPlain(diffs);
    }
    default: {
      return formatAsPretty(diffs);
    }
  }
};
