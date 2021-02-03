import * as moment from 'moment';
import {Moment} from 'moment';

export class Helpers {

  static orderStatus = {
    ORDER_ACTIVE: 1,
    ORDER_QUEUED: 2,
    ORDER_ARCHIVED: 3,
  };

  static now() {
    return moment().utc();
  }

  static fromMysqlDateTime(value: string): Moment {
    return moment.utc(value, 'YYYY-MM-DD HH:mm:ss');
  }

  static toMysqlDate(date: Moment): string {
    return date ? date.format('YYYY-MM-DD') : '';
  }


  static formatDate(date: Moment): string {
    return date.format('YYYY-MM-DD HH:mm:ss');
  }


}
