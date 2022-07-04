/**
 * Cache bust a string
 *
 * @param {string} [str='']
 * @returns
 */
const cacheBust = (str = '') => {
    return `${str}?${Math.round(new Date().getTime() / 1000)}`;
};

module.exports = cacheBust
