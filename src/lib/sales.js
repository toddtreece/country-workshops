import Converter from './converter';
import pad from 'pad';

export default class SalesConverter extends Converter {

  fields = [
    'Account',
    'Customer',
    'Date',
    'Tax',
    'Number',
    'Class',
    'Item',
    'Description',
    'Quantity',
    'Rate',
    'Amount',
    'Taxable'
  ];

  out_path = 'out/sales';
  delimiter = ',';
  extension = 'csv';

  constructor() {
    super();
  }

  valid(row) {
    return row.Customer.trim() !== '';
  }

  _write(row, enc, done) {

    if(!row.FIRST_NAME) return done();
    if(!row.LAST_NAME) return done();
    if(!row.ORDER_NO) return done();

    let tmp = {
      Account: 'Sales',
      Customer: `${row.FIRST_NAME} ${row.LAST_NAME}`,
      Date: row.DATE_RECD,
      Tax: '',
      Number: row.ORDER_NO,
      Class: 'Product',
      Item: '',
      Description: '',
      Quantity: '',
      Rate: '',
      Amount: '',
      Taxable: 'No'
    };

    let num;
    let rec;

    for(let i=1; i<13; i++) {
      rec = Object.assign({}, tmp);
      num = pad(2, i.toString(), '0');
      if(!row[`QTY${num}`]) continue;
      if(!row[`CW_CAT${num}`]) continue;
      if(!row[`DESCRIPT${num}`]) continue;
      rec['Item'] = row[`CW_CAT${num}`];
      rec['Description'] = row[`DESCRIPT${num}`];
      rec['Quantity'] = row[`QTY${num}`];
      rec['Amount'] = (/2016$/.test(row.DATE_RECD) ? row[`LINE_TOT${num}`] : '0');
      this.records.push(rec);
    }

    done();

  }

}
