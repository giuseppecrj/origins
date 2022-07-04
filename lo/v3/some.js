/**
 * Grabs a src array and check if dest array has some of the values inside src
 *
 * @param {*} src
 * @param {*} dest
 * @example
 * lo.some([1, 2], [2])
 */
const some = (src, dest) => src.some((val) => dest.includes(val));

module.exports = some
