import renderAsJson from './json.js';
import renderAsPlain from './plain.js';
import renderAsPretty from './pretty.js';

export default (diffs, format) => {
  switch (format.toLowerCase()) {
    case 'json': {
      return renderAsJson(diffs);
    }
    case 'plain': {
      return renderAsPlain(diffs);
    }
    default: {
      return renderAsPretty(diffs);
    }
  }
};
