function cleanup(...vars) {
    vars.forEach((v) => v = null);
}

module.exports = cleanup;
