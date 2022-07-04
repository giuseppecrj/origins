const throwError = require('./throwError')

function decodeBase64(dataUri) {
    const matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/); // eslint-disable-line no-useless-escape
    const response = {};

    if (!matches || matches.length !== 3) {
        throwError('Image is not a data uri');
        return null;
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    return response;
}

module.exports = decodeBase64
