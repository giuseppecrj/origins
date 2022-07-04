/**
 * Adds seconds to a date
 *
 * @param {number} [offset=1]
 * @returns
 */
const expiration = (offset = 1, currentDate = new Date()) => {
    return Math.round(currentDate.setMonth(currentDate.getMonth() + offset) / 1000);
};

module.exports = expiration
