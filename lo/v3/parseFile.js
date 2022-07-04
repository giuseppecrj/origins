/**
 * Parses a file returning name and extension
 *
 * @param {*} filename
 * @returns
 */
const parseFile = (filename) => {
    const extension = /(?:\.([^.]+))?$/.exec(filename)[1];
    const name = filename.substring(0, filename.lastIndexOf('.'));
    return { name, extension };
};

module.exports = parseFile
