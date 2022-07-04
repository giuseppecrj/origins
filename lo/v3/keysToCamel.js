const isObject = require('./isObject')
const snakeToCamel = require('./snakeToCamel')

const keysToCamel = function (o) {
    if (isObject(o)) {
        const n = {};

        Object.keys(o)
            .forEach((k) => {
                n[snakeToCamel(k)] = keysToCamel(o[k]);
            });

        return n;
    } else if (Array.isArray(o)) {
        return o.map((i) => {
            return keysToCamel(i);
        });
    }

    return o;
};

module.exports = keysToCamel
