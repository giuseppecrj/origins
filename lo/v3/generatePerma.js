/**
 * Generates a perma
 *
 * @param {string} [title='string']
 * @param {string} [character='-']
 * @returns
 */
const generatePerma = (title = 'string', character = '-') => {
    const dash = [' ', '.', ':'];
    let none = [`'`, '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '?', '<', ',', '>', '/', '[', ']', '{', '}'];

    title = title.toLowerCase().split('');

    const perma = title.map((char) => {
        dash.map((d, i) => {
            if (char === dash[i]) {
                char = character;
            }
        });

        none.map((n, i) => {
            if (char === none[i]) {
                char = '';
            }
        });

        return char;
    }).join('');

    return perma;
};

module.exports = generatePerma
