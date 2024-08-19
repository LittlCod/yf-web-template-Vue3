// date.js
export function formatDate(date, fmt) {
    if(!date) {
        return;
    }
    date = new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
    if (!separator) {
        separator = "-";
    }
    let dateArr = dateStr.split(separator);
    let year = parseInt(dateArr[0]);
    let month;
    //处理月份为04这样的情况
    if (dateArr[1].indexOf("0") == 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    let day = parseInt(dateArr[2]);
    let date = new Date(year, month - 1, day);
    return date;
}

export function newDate(num) {
    let date = new Date();//获取当前时间
    date.setDate(date.getDate() + num); //num正数为后一天，负数为前一天
    return date;
}

// 根据基准日期，获取长度为dayLenth的日期数组
export const getDateByStep = function (date = new Date(), step = 7) {
    let weekData = [];
    const week = date.getDay() + 5;
    date = getDateByDate(date, week * -1);
    for (let i = 0; i < step; i++) {
        weekData.push(getDateByDateDate(i == 0 ? date : getDateByDate(date, 1)))
    }
    return weekData;
}

// 根据基准日期获取前后某天的日期对象
export const getDateByDate = function (date = new Date(), range = 0) {
    date.setDate(date.getDate() + range);
    return date;
};

// 根据参数日期获取具体日期信息
export const getDateByDateDate = function (date = new Date()) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let week = ['天', '一', '二', '三', '四', '五', '六'][date.getDay()];

    const dateInfo = {
        date: new Date(date),
        dateStr: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        year,
        month,
        day,
        week,
        isToday: false
    }

    const today = new Date();
    // 判断是否为当天
    if (today.getFullYear() === year && (today.getMonth() + 1) === month && today.getDate() === day) {
        dateInfo['isToday'] = true;
    }
    return dateInfo;
};
