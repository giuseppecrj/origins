/**
 * Checks if value is an empty object or collection. ❗️Note this is not evaluating a Set or a Map
 *
 * @param {*} obj
 */
const isEmpty = (obj) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

module.exports = isEmpty;
