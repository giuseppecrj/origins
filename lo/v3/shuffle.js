/**
 * Shuffles an array
 *
 * @param {string[]|number[]}
 * @returns {string[]|number[]}
 */
const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // eslint-disable-next-line fp/no-loops
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // store current value in a temporary box
        temporaryValue = array[currentIndex];

        // replace the current value with the random value
        array[currentIndex] = array[randomIndex];

        // put the temporary box in the random index area
        array[randomIndex] = temporaryValue;
    }

    return array;
};

module.exports = shuffle
