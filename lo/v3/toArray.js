/**
 * Converts an object to an array with optional id as part of array
 *
 * @param {*} obj
 * @param {boolean} [id=false]
 * @returns
 */
const toArray = (obj, id = false) => {
    return Object.keys(obj).reduce((sum, key) => {
        if (id) obj[key].id = key;
        return sum.concat(obj[key]);
    }, []);
};

module.exports = toArray
