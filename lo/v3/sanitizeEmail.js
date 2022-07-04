function sanitizeEmail(val) {
    val = val.toLowerCase()

    if (!val.includes('+')) return val
    const splitEmail = val.split('+'); //  ["test", "test", "1@gmail.com"]
    const emailExt = `@${splitEmail[splitEmail.length - 1].split('@')[1]}`
    return `${splitEmail[0]}${emailExt}`;
}


module.exports = sanitizeEmail
