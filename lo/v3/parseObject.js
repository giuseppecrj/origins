/**
 * Returns and object whether the object is stringified or not
 *
 * @param {*} body
 */
const parseObject = (body) => typeof body === 'string' ? JSON.parse(body) : body;

module.exports = parseObject
