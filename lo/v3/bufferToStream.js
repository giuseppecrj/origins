/**
 * Creates a stream from a buffer
 *
 * @param {*} buffer
 * @returns
 */
function bufferToStream(buffer) {
    let Duplex = require('stream').Duplex;
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

module.exports = bufferToStream
