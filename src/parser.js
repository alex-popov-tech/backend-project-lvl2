import { readFileSync } from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';
import { extname, resolve } from 'path';

const isNumberAsString = (value) => typeof value === 'string' && !Number.isNaN(Number(value));

const parseIni = (buffer) => {
  const objectWithNumbersAsStrings = ini.parse(buffer.toString());
  const cloned = _.cloneDeep(objectWithNumbersAsStrings);
  const normalize = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        normalize(value);
      } else if (isNumberAsString(value)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = Number(value);
      }
    });
  };

  normalize(cloned);
  return cloned;
};

export default (path) => {
  const absolutePath = resolve(process.cwd(), path);
  const extension = extname(absolutePath);
  const buffer = readFileSync(absolutePath);
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
