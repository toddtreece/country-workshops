import Converter from './converter';

export default class MailConverter extends Converter {

  fields = ['name', 'email'];

  constructor(out_path) {
    super(out_path);
  }

  name(row) {
    return `${row.FIRST_NAME} ${row.LAST_NAME}`;
  }

  email(row) {
    const mail = row.EMAIL.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

    return mail ? mail[0] : '';
  }

}
