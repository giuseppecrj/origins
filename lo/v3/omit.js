/**
 * Returns a copy of the object, filtered to omit the keys specified.
 *
 * @param {*} obj
 * @param {Array|String} propToDelete
 * @example
 * let obj = { firstname: 'John', lastname: 'Smith', email: 'john@example.com'}
 *
 * omit(obj, 'firstname')
 * // => { lastname: 'Smith', email: 'john@example.com' }
 *
 * omit(obj, ['firstname', 'lastname'])
 * // => { email: 'john@example.com' }
 */

const single = function (obj, propToDelete) {
    const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
    return objectWithoutDeletedProp;
}

const omit = (obj, propToDelete) => {
    if (Array.isArray(propToDelete)) {
        return propToDelete.reduce((accum, curr) => {
            return single(accum, curr)
        }, obj)
    } else {
        return single(obj, propToDelete)
    }
};

module.exports = omit
