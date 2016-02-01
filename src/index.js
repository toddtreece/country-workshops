import Converter from './lib/converter';
import fs from 'fs';
import csv from 'csv';
import yargs from 'yargs';

const type = process.env.CW_TYPE;

const input = fs.createReadStream(`in/${type}.csv`),
      parser = csv.parse({delimiter: ',', columns: true}),
      output = Converter.getType(type);

input.pipe(parser).pipe(output);
