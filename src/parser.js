import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const parseIni = (content) => {
  const objectWithNumbersAsStrings = ini.parse(content);
  const getNormalizedClone = (obj) => _.keys(obj)
    .reduce((acc, key) => {
      const value = obj[key];
      if (_.isPlainObject(value)) {
        return { ...acc, [key]: getNormalizedClone(value) };
      }
      if (Number.isFinite(parseFloat(value))) {
        return { ...acc, [key]: parseFloat(value) };
      }
      return { ...acc, [key]: value };
    }, {});
  return getNormalizedClone(objectWithNumbersAsStrings);
};

export default ({ content, format }) => {
  switch (format) {
    case 'json': {
      return JSON.parse(content);
    }
    case 'yml': {
      return yaml.safeLoad(content);
    }
    case 'ini': {
      return parseIni(content);
    }
    default: {
      throw new Error(`Invalid format used - "${format}"`);
    }
  }
};
