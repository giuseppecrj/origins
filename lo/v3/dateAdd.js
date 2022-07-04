/**
 * Add a specified amount to a date
 *
 * @param {*} date
 * @param {string} [interval='year']
 * @param {number} [units=1]
 * @example
 * dateAdd(new Date(), 1, 'minute)
 */
function dateAdd(date, units = 1, interval = 'year') {
    let ret = new Date(date); //don't change original date
    let checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
    switch (interval.toLowerCase()) {
        case 'year': case 'years': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
        case 'quarter': ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
        case 'month': ret.setMonth(ret.getMonth() + units); checkRollover(); break;
        case 'week': case 'weeks': ret.setDate(ret.getDate() + 7 * units); break;
        case 'day': case 'days': ret.setDate(ret.getDate() + units); break;
        case 'hour': case 'hours': ret.setTime(ret.getTime() + units * 3600000); break;
        case 'minute': case 'minutes': ret.setTime(ret.getTime() + units * 60000); break;
        case 'second': ret.setTime(ret.getTime() + units * 1000); break;
        default: ret = undefined; break;
    }

    return ret;
}

module.exports = dateAdd
