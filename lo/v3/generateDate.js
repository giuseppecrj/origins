const generateDate = (date) => {
    const addZero = (obj) => obj.length < 2 ? ('0' + obj) : obj;

    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + (d.getDate());
    let year = d.getFullYear();

    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();
    let meridian = hours >= 12 ? 'pm' : 'am';

    month = addZero(month);
    day = addZero(day);

    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);

    const time = [hours, minutes, seconds].join('-') + meridian;
    const finalDate = [year, month, day].join('-');
    return [finalDate, time].join('_');
};

module.exports = generateDate
