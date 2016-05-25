import Converter from './converter';

export default class VenderConverter extends Converter {

  fields = [
    'VEND',
    'NAME',
    'REFNUM',
    'TIMESTAMP',
    'PRINTAS',
    'ADDR1',
    'ADDR2',
    'ADDR3',
    'ADDR4',
    'ADDR5',
    'VTYPE',
    'CONT1',
    'CONT2',
    'PHONE1',
    'PHONE2',
    'FAXNUM',
    'EMAIL',
    'NOTE',
    'TAXID',
    'LIMIT',
    'TERMS',
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
    'CUSTFLD15'
  ];

  out_path = 'out/vendors';

  constructor() {
    super();
  }

  valid(row) {
    return row.VEND_NAME.trim() !== '';
  }

  REFNUM(row) { return row.SUPPL_ID; }
  NAME(row) { return row.VEND_NAME; }
  COMPANYNAME(row) { return row.VEND_NAME; }
  CONT1(row) { return row.CONTACT_NM; }
  ADDR1(row) { return row.VEND_NAME; }
  ADDR2(row) { return row.ADDRESS_1; }
  ADDR3(row) { return row.ADDRESS_2; }
  ADDR4(row) { return `${row.CITY}${row.COUNTRY.trim() ? '' : ','} ${row.STATE} ${row.ZIP_CODE}`; }
  ADDR5(row) { return row.COUNTRY; }
  PHONE1(row) { return row.PHONE; }
  FAXNUM(row) { return row.FAX; }
  NOTE(row) { return row.BO_ITEMS; }
  VEND(row) { return 'VEND'; }
  CUSTFLD1(row) { return row.MARKUP; }
  CUSTFLD2(row) { return row.STAFF_DISC; }

  EMAIL(row) {
    const mail = row.E_MAIL.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    return mail ? mail[0] : '';
  }

}
