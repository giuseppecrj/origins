const isEqual = require('./deepEqual');
const isObject = require('./isObject');

/**
 *
 * @param {Object} object The object to compare against
 * @param {Object} base The original objects
 * @returns {Object} An object of differences between the
 */
function difference(object, base) {
    if (Array.isArray(object) && Array.isArray(base)) {
        return base.filter((key) => !object.includes(key));
    }

    return Object.keys(object).reduce((accum, key) => {
        let value = object[key];

        if (!isEqual(value, base[key])) {
            accum[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
        }

        return accum;
    }, {});
}

module.exports = difference;
