/**
 * Converts an object to an array with optional id as part of array
 *
 * @param {*} obj
 * @param {boolean} [id=false]
 * @returns
 */
 const toObject = (array, id) => {
    if (!id) throw new Error('id is required');

    return array.reduce((accum, current) => {
        accum[current[id]] = current;
        return accum;
    }, {});
};

module.exports = toObject;
