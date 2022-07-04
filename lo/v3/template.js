/**
 *
 *
 * @param {*} str
 * @param {*} data
 * @description Find Replace regex useful for template
 * @example
 *      template('hello %name%', { name: "World"})
 *      // hello World
 * @returns {String} Returns a templated string
 */
function template(str, data) {
    return str
        .replace(
            /%(\w*)%/g,
            function (m, key) {
                return data.hasOwnProperty(key) ? data[key] : '';
            }
        );
}

module.exports = template
