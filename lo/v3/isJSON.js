/**
 * Check if string is an object
 *
 * @param {*} str
 * @returns
 */
const isJSON = (str) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
};


module.exports = isJSON
