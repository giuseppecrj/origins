/**
 * Curry a function
 *
 * @param {*} fn
 * @returns
 */
const curry = (fn) => {
    let arity = fn.length;
    return (function resolver() {
        let memory = Array.prototype.slice.call(arguments);
        return function () {
            let local = memory.slice();
            let next;
            Array.prototype.push.apply(local, arguments);
            next = local.length >= arity ? fn : resolver;
            return next.apply(null, local);
        };
    }());
};

module.exports = curry
