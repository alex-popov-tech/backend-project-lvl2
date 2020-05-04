import { readFileSync } from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';
import { extname, resolve } from 'path';

const isNumberInsideString = (value) => typeof value === 'string' && !Number.isNaN(Number(value));

const normalize = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object') {
      normalize(value);
    } else if (isNumberInsideString(value)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = Number(value);
    }
  });
};

const parseIni = (fileBuffer) => {
  const objectWithNumbersAsStrings = ini.parse(fileBuffer.toString());
  const clonedObject = _.cloneDeep(objectWithNumbersAsStrings);
  normalize(clonedObject);
  return clonedObject;
};

export default (filePath) => {
  const absoluteFilePath = resolve(process.cwd(), filePath);
  const fileExtension = extname(absoluteFilePath);
  const fileBuffer = readFileSync(absoluteFilePath);
  switch (fileExtension) {
    case '.json': {
      return JSON.parse(fileBuffer.toString());
    }
    case '.yml': {
      return yaml.safeLoad(fileBuffer);
    }
    case '.ini': {
      return parseIni(fileBuffer);
    }
    default: {
      throw new Error(`Invalid extension used - "${fileExtension}"`);
    }
  }
};
