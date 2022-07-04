/**
 *
 * @param  {...Array} args Arrays
 * @description Concatenates multiple arrays together
 * @example
 *  concat(['1'], ['2', '3'])
 *  // return ['1', '2', '3']
 * @returns {Array} Returns a concatenated array
 */
function concat(...args) {
    return args.reduce((acc, val) => [...acc, ...val]);
}

module.exports = concat
