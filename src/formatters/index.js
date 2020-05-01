import renderAsJson from './json';
import renderAsPlain from './plain';

export default (diffs, format) => {
  switch (format.toLowerCase()) {
    case 'json': {
      return renderAsJson(diffs);
    }
    case 'plain': {
      return renderAsPlain(diffs);
    }
    default: {
      throw new Error(`Format "${format}" is not supported.`);
    }
  }
};
