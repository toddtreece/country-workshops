import Stream from 'stream';
import csv from 'csv';
import fs from 'fs';
import pad from 'pad';

export default class Converter extends Stream.Writable {

  records = [];
  fields = [];
  count = 0;
  limit = 1000;
  out_path = '';

  constructor() {
    super({objectMode: true});
    this.once('finish', this._flush);
  }

  _write(row, enc, done) {

    const record = {};

    // loop through field conversion functions and generate record
    this.fields.forEach((field) => {
      record[field] = this[field].call(this, row);
    });

    // push record to array
    this.records.push(record);

    // if we are under the limit, keep going
    if(this.records.length < this.limit)
      return done();

    csv.stringify(this.records, {header: true}, (err, output) => {
      fs.writeFileSync(this.fileName(), output);
      this.count++;
      this.records = [];
      done();
    });

  }

  _flush() {

    if(this.records.length === 0)
      return;

    csv.stringify(this.records, {header: true}, (err, output) => {
      fs.writeFileSync(this.fileName(), output);
    });

  }

  fileName() {
    return `${this.out_path}_${pad(2, this.count.toString(), '0')}.csv`;
  }

  static getType(type) {
    let conv = require(`./${type}`).default;
    return new conv();
  }

}
