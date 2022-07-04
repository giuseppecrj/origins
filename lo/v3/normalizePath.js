function normalizePath(path) {
    const _split = path.split('/');
    return _split[0] === '' ? _split.splice(1, _split.length) : _split;
}

module.exports = normalizePath
