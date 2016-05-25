import Converter from './converter';

export default class MailConverter extends Converter {

  fields = [
    'CUST',
    'NAME',
    'REFNUM',
    'TIMESTAMP',
    'HIDDEN',
    'BADDR1',
    'BADDR2',
    'BADDR3',
    'BADDR4',
    'BADDR5',
    'SADDR1',
    'SADDR2',
    'SADDR3',
    'SADDR4',
    'SADDR5',
    'PHONE1',
    'PHONE2',
    'FAXNUM',
    'EMAIL',
    'CONT1',
    'CONT2',
    'CTYPE',
    'TERMS',
    'TAXABLE',
    'LIMIT',
    'RESALENUM',
    'REP',
    'TAXITEM',
    'NOTEPAD',
    'SALUTATION',
    'COMPANYNAME',
    'FIRSTNAME',
    'MIDINIT',
    'LASTNAME',
    'CUSTFLD1',
    'CUSTFLD2',
    'CUSTFLD3',
    'CUSTFLD4',
    'CUSTFLD5',
    'CUSTFLD6',
    'CUSTFLD7',
    'CUSTFLD8',
    'CUSTFLD9',
    'CUSTFLD10',
    'CUSTFLD11',
    'CUSTFLD12',
    'CUSTFLD13',
    'CUSTFLD14',
    'CUSTFLD15',
    'JOBDESC',
    'JOBTYPE',
    'JOBSTATUS',
    'JOBSTART',
    'JOBPROJEND',
    'JOBEND'
  ];

  out_path = 'out/mail';

  constructor() {
    super();
  }

  valid(row) {
    return row.FIRST_NAME.trim() !== '';
  }

  NAME(row) { return `${row.FIRST_NAME} ${row.LAST_NAME}`; }
  FIRSTNAME(row) { return row.FIRST_NAME; }
  LASTNAME(row) { return row.LAST_NAME; }
  BADDR1(row) { return this.NAME(row); }
  BADDR2(row) { return row.ADDRESS_1; }
  BADDR3(row) { return row.ADDRESS_2; }
  BADDR4(row) { return `${row.CITY}${row.COUNTRY.trim() ? '' : ','} ${row.STATE} ${row.ZIP_CODE}`; }
  BADDR5(row) { return row.COUNTRY; }
  PHONE1(row) { return row.PHONE_HOME; }
  PHONE2(row) { return row.PHONE_WORK; }
  NOTEPAD(row) { return row.COMMENTS; }
  CUST(row) { return 'CUST'; }
  REFNUM(row) { return row.NAME_ID; }
  HIDDEN(row) { return row.DEAD == 'T' ? 'Y' : 'N'; }

  EMAIL(row) {
    const mail = row.EMAIL.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    return mail ? mail[0] : '';
  }

}
