function queryString(params) {
    if (!params) return '';
    return Object.keys(params).map(function (key) {
        if (params[key] && typeof params[key] === 'object') return `${key}=${queryString(params[key])}`;
        else if (params[key]) return `${key}=${params[key]}`;
    }).join('&');
}

module.exports = queryString;
