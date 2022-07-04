const removeExtension = (filename) => filename.substring(0, filename.lastIndexOf('.')) || filename

module.exports = removeExtension
