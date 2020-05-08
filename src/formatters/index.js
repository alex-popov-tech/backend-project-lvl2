import formatAsPlain from './plain.js';
import formatAsPretty from './pretty.js';

export default (differences, format) => {
  switch (format.toLowerCase()) {
    case 'json': {
      const INDENT = '  ';
      return JSON.stringify(differences, null, INDENT);
    }
    case 'plain': {
      return formatAsPlain(differences);
    }
    case 'pretty': {
      return formatAsPretty(differences);
    }
    default: {
      throw new Error(`Format "${format}" is not supported`);
    }
  }
};
