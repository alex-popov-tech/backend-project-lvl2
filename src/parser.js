import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const parseIni = (buffer) => {
  const objectWithNumbersAsStrings = ini.parse(buffer.toString());
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

export default (buffer, extension) => {
  switch (extension) {
    case '.json': {
      return JSON.parse(buffer.toString());
    }
    case '.yml': {
      return yaml.safeLoad(buffer);
    }
    case '.ini': {
      return parseIni(buffer);
    }
    default: {
      throw new Error(`Invalid extension used - "${extension}"`);
    }
  }
};
