/**
 * Check whether an item is an object or not
 *
 * @param {*} item
 * @returns
 */
function isObject(item) {
    return (item === Object(item) && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

module.exports = isObject
