/**
 * Makes a human readable date
 *
 * @param {*} date
 * @returns
 */
const timeSince = (date) => {
    let passedDate = new Date(typeof date === 'string' ? Date.parse(date) : date);
    let currentDate = new Date();

    let diff = Math.floor((currentDate - passedDate) / 1000);
    if (diff <= 1) return 'just now';
    if (diff < 20) return diff + ' seconds ago';
    if (diff < 40) return 'half a minute ago';
    if (diff < 60) return 'less than a minute ago';
    if (diff <= 90) return 'one minute ago';
    if (diff <= 3540) return Math.round(diff / 60) + ' minutes ago';
    if (diff <= 5400) return '1 hour ago';
    if (diff <= 86400) return Math.round(diff / 3600) + ' hours ago';
    if (diff <= 129600) return '1 day ago';
    if (diff < 604800) return Math.round(diff / 86400) + ' days ago';
    if (diff <= 777600) return '1 week ago';
    if (diff <= 1507600) return '2 weeks ago';
    if (diff <= 2207600) return '3 weeks ago';
    if (diff <= 3007600) return '1 month ago';
    if (diff <= 6007600) return '2 months ago';
    return 'more than 1 week ago';
};

module.exports = timeSince
