import { readFileSync } from 'fs';
import ini from 'ini';
import _ from 'lodash';
import yaml from 'js-yaml';
import { extname, resolve } from 'path';


const normalize = (object) => {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object') {
      normalize(value);
    } else if ( typeof value === 'string' && !Number.isNaN(Number(value))){
      object[key] = Number(value);
    }
  }
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
