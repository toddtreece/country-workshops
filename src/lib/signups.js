import Converter from './converter';
import pad from 'pad';

export default class SignupsConverter extends Converter {

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

  out_path = 'out/signups';

  constructor() {
    super();
  }

  valid(row) {
    return row.Customer.trim() !== '';
  }

  _write(row, enc, done) {

    if(!row.FIRST_NAME) return done();
    if(!row.LAST_NAME) return done();

    let rec = {
      Account: 'Wells Fargo Business Checking',
      Customer: `${row.FIRST_NAME} ${row.LAST_NAME}`,
      Date: '',
      Tax: '',
      Number: row.CLASS_ID,
      Class: 'Sales',
      Item: '',
      Description: '',
      Quantity: '',
      Rate: '',
      Amount: '',
      Taxable: 'Yes'
    };

    let num;

    for(let i=1; i<13; i++) {
      num = pad(2, i.toString(), '0');
      if(!row[`QTY${num}`]) continue;
      rec['Date'] = row[`DATE${num}`];
      rec['Item'] = row[`ITEM${num}`];
      rec['Description'] = row[`ITEM${num}`];
      rec['Quantity'] = '1';
      rec['Amount'] = row[`AMOUNT${num}`];
      this.records.push(Object.assign({},rec));
    }

    done();

  }

}
