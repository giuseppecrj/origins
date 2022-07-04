const objectByString = require('./objectByString')
const throwError = require('./throwError')

/**
 * checks an object for specific keys and the existence of their values
 *
 * @param {*} [checkers=[]]
 * @param {*} [body={}]
 * @returns
 */
const checkBody = (checkers = [], body = {}) => {
    checkers.map((item) => {
        const split = item.split('.');
        if (split.length > 1) {
            if (!objectByString(item, body)) throwError(`error: missing ${item}`, 200);
        } else {
            if (!body[item]) throwError(`error: missing ${item}`, 200);
        }
    });

    return body;
};

module.exports = checkBody
