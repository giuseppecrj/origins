/**
 * Create copy of an object
 *
 * @param {*} obj
 * @returns
 */
const cloneObject = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

module.exports = cloneObject
