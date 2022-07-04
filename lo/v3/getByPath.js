/**
 * Gets the value at path of object. Note: If provided path does not exists inside the object js will generate error.
 *
 * @param {*} obj
 * @param {*} path
 * @param {*} [defaultValue=null]
 * @example
 * var object = { a: [{ b: { c: 3 } }] };
 * var result = getByPath(object, 'a[0].b.c', 1);
 * // output: 3
 *
 */
const getByPath = (obj, path, defaultValue = null) =>
    String.prototype.split.call(path, /[,[\].]+?/)
        .filter(Boolean)
        .reduce((a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue), obj);

module.exports = getByPath
