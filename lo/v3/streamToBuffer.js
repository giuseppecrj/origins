/**
 * Creates a buffer from a stream
 *
 * @param {*} stream
 * @returns
 */
function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        let buffers = [];
        stream.on('error', reject);
        stream.on('data', (data) => buffers.push(data));
        stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
}

module.exports = streamToBuffer
