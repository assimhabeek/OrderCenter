import * as moment from 'moment-timezone';
import {Moment} from 'moment-timezone';

export class Helpers {

    static NOT_EMPTY_CHAR = 'NIL';
    static TIMEZONE = 'America/Chicago';

    static orderStatus = {
        ORDER_ACTIVE: 1,
        ORDER_QUEUED: 2,
        ORDER_ARCHIVED: 3,
    };

    static now(): Moment {
        return moment().tz(Helpers.TIMEZONE);
    }

    static fromMysqlDateTime(value: string): Moment {
        return moment.tz(value, 'YYYY-MM-DD HH:mm:ss', Helpers.TIMEZONE);
    }

    static toMysqlDate(date: Moment): string {
        return date ? date.format('YYYY-MM-DD') : '';
    }


    static formatDate(date: Moment): string {
        return date.format('YYYY-MM-DD HH:mm:ss');
    }


}
