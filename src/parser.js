import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { extname, resolve } from 'path';


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
    default: {
      throw new Error(`Invalid extension used - "${fileExtension}"`);
    }
  }
};
