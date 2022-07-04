/**
 * Helper functions to throw request error messages
 *
 * @param {string} [message='error']
 * @param {number} [status=200]
 */
const throwError = (message = 'error', status = 200, details) => {
    const err = new Error(message);
    // const err = new Error(process.env.NODE_ENV === 'production' ? 'Invalid Request' : message);
    err.status = status;
    if (details) err.info = details
    throw err;
};

module.exports = throwError
