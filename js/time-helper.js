function newTime(timeSting) {
    const today = new Date();
    return new Date(today.toDateString() + ' ' + timeSting);
}

function inTimeRange(date, start, end) {
    return (!start || date >= start) && (!end || date <= end);
}

function addToDate(date, { days, hours, minutes, seconds }) {
    const newDate = new Date(date.getTime());
    if (days) {
        newDate.setDate(newDate.getDate() + days);
    }

    if (hours) {
        newDate.setHours(newDate.getHours() + hours);
    }
    
    if (minutes) {
        newDate.setMinutes(newDate.getMinutes() + minutes);
    }

    if (seconds) {
        newDate.setSeconds(newDate.getSeconds() + seconds);
    }

    return newDate;
}

function substractToDate(date, { days, hours, minutes, seconds }) {
    const newDate = new Date(date.getTime());
    if (days) {
        newDate.setDate(newDate.getDate() - days);
    }

    if (hours) {
        newDate.setHours(newDate.getHours() - hours);
    }
    
    if (minutes) {
        newDate.setMinutes(newDate.getMinutes() - minutes);
    }

    if (seconds) {
        newDate.setSeconds(newDate.getSeconds() - seconds);
    }

    return newDate;
}