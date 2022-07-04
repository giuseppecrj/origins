/**
 * implements a filter() for Objects in JavaScript
 *
 * @param {*} obj
 * @param {*} predicate
 * @returns
 */
const _predicate = (val) => val !== null && val !== false && val !== undefined;
const pickBy = (obj, predicate) => {
    const result = {};
    if (!predicate) predicate = _predicate;

    for (let key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
};

module.exports = pickBy
