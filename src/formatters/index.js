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
    default: {
      return formatAsPretty(differences);
    }
  }
};
