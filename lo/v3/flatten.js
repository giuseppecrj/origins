/**
 * Flattens an array can be bidimensional or multidimensional
 *
 * @param {*} arr
 * @param {string} [dimension='bi']
 * @example
 * flatten([1, [[2], [3, [4]], 5]], 'multi')
 * // => [1, 2, 3, 4, 5]
 */
const flatten = (arr, dimension = 'bi') => {
    let flattenBi = (_arr) => [].concat(..._arr);

    if (dimension === 'bi') {
        return flattenBi(arr);
    }

    if (dimension === 'multi' || dimension === 'deep') {
        const flattened = flattenBi(arr);
        return flattened.some(item => Array.isArray(item)) ? flatten(flattened, 'multi') : flattened;
    }
};

module.exports = flatten
