/**
 * The method is used to copy the values of all enumerable own and inherited properties from one or more source objects to a target object.
 *
 * @param {*} target
 * @param {*} sources
 * @returns
 */
const extend = (target, ...sources) => {
    let source = [];
    sources.forEach(src => {
        source = source.concat([src, Object.getPrototypeOf(src)]);
    });
    return Object.assign(target, ...source);
};

module.exports = extend
