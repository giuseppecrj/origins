const throwError = require('./throwError')

/**
 * Checks the method is in the request
 *
 * @param {*} request
 * @param {string} [method='GET']
 */
function checkMethod(request, method = 'GET') {
    if (request.method.toLowerCase() !== method.toLowerCase()) throwError(`Please provide a ${process.env.NODE_ENV === 'production' ? 'valid' : method} method`, 400);
}

module.exports = checkMethod
