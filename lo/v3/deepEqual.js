const assert = require('assert')

function deepEqual(a, b) {
    try {
        assert.deepStrictEqual(a, b)
    } catch (error) {
        return false
    }
    return true;
};

module.exports = deepEqual
