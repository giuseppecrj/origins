const fileExt = (key) => {
    const re = /(?:\.([^.]+))?$/
    const ext = re.exec(key)
    return ext[1]
}

module.exports = fileExt
