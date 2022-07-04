/**
 * Retrieves an objects values by passing a period separated string eg: (name.last)
 *
 * @param {string} [path='string']
 * @param {*} [obj={}]
 * @returns
 */
const objectByString = (path = 'string', obj = {}) => {
    path = path.replace(/\[(\w+)\]/g, '.$1'); // converts indexes to properties
    path = path.replace(/^\./, ''); // removes any leading dots

    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj || {});
};

module.exports = objectByString;
