import Stream from 'stream';
import csv from 'csv';
import fs from 'fs';
import pad from 'pad';

export default class Converter extends Stream.Writable {

  records = [];
  fields = [];
  out_path = '';
  delimiter = '\t';
  extension = 'iif';

  constructor() {
    super({objectMode: true});
    this.once('finish', this._flush);
  }

  _write(row, enc, done) {

    if(! this.valid(row)) return done();

    const record = {};

    // loop through field conversion functions and generate record
    this.fields.forEach((field) => {
      if(this[field])
        record[field] = this[field].call(this, row);
      else if(row[field])
        record[field] = row[field];
     else
        record[field] = '';

      record[field] = record[field].replace(/(?:\r\n|\r|\n|\t|\v)/g, ' ');
      record[field] = record[field].replace(/\s\s+/g, ' ');
    });

    // push record to array
    this.records.push(record);
    done();

  }

  _flush() {

    if(this.records.length === 0)
      return;

    csv.stringify(this.records, {header: true, delimiter: this.delimiter}, (err, output) => {
      fs.writeFileSync(this.fileName(), output);
    });

  }

  fileName() {
    return `${this.out_path}.${this.extension}`;
  }

  static getType(type) {
    let conv = require(`./${type}`).default;
    return new conv();
  }

}
