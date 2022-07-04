/**
 * Creates an array of elements split into groups the length of size.
 *
 * @param {string[]} input
 * @param {number} size
 * @example
 * chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 */
const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
};

module.exports = chunk
