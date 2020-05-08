#!/usr/bin/env node
import commander from 'commander';
import generateFormattedDifferences from '../src/index.js';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'pretty')
  .arguments('<firstFilePath> <secondFilePath>')
  .action(
    (firstFilePath, secondFilePath, options) => {
      console.log(generateFormattedDifferences(firstFilePath, secondFilePath, options.format));
    },
  )
  .parse(process.argv);
