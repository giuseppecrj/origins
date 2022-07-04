/**
 * Creates and array with number, starting from x, exclusive
 *
 * @param {number} [start=0]
 * @param {number} stop
 * @example
 * range(0, 20)
 * // => [0, 1, 2, 3, 4... 19]
 */
const range = (start = 0, stop) => {
    if (!stop) {
        stop = start;
        start = 0;
    }

    return Array.from(Array(stop), (_, i) => start + i);
};

module.exports = range
