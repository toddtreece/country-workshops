import fs from 'fs';
import csv from 'csv';
import Converter from './lib/mail';

const input = fs.createReadStream('./in/mail.csv'),
      parser = csv.parse({delimiter: ',', columns: true}),
      output = new Converter('./out/mail');

input.pipe(parser).pipe(output);
