/**
 * Creates an object composed of the object properties predicate returns truthy for.
 *
 * @param {*} object
 * @param {*} keys
 * @example
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 * var result = lo.pick(object, ['a', 'c']);
 * // output: {a: 1, c: 3}
 */
function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}

module.exports = pick;
