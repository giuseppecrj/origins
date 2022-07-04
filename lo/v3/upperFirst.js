/**
 * Uppercases the first letter of a given string
 *
 * @param {*} string
 * @returns
 */
const upperFirst = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};

module.exports = upperFirst
