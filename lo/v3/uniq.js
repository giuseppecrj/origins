/**
 * Removes duplicate values from an array
 *
 * @param {*} arr
 * @example
 * var array = [1, 2, 1, 4, 1, 3]
 * uniq(array)
 * // output: [1, 2, 4, 3]
 */
const uniq = (arr) => [...new Set(arr)];

module.exports = uniq
