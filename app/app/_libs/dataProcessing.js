export default function rotateArray(arr) {
  if (arr.length > 1) {
    let firstItem = arr.shift();
    arr.push(firstItem);
  }
  return arr;
}

export function convertToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+|_+/g, '-')
    .toLowerCase();
}

export function replaceHyphens(str) {
  return str.replace(/-/g, '%');
}

function getLastSevenDays() {
    const today = new Date();
    const lastSevenDays = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        lastSevenDays.push(day);
    }

    return lastSevenDays;
}


export function queryParamsToSql(request, param, sqlPrefix) {
  const searchParams = request.nextUrl.searchParams;
  let result = '';
  const paramValue = searchParams.get(param);
  if (paramValue) {
    result = `${sqlPrefix} (${paramValue})`;
  }
  return result;
}

export function createDatesArray(earliest=6, latest = 0) {
  const datesArray = [];
  for (let i = earliest; i >= latest ; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    datesArray.push(date);
  }
  return datesArray;
}

export function isSameDate(date1, date2) {
  // console.log(date2)
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  const result = date1 - date2 == 0;
  return result;
}

export const formatDate = (dateObject, options = null) => {
  /* 
  To get the day of the week, options can be set to 
  `{ weekday: 'narrow' }`, { weekday: 'short' }, { weekday: 'long' }

  To get the month, options are:
  `{month: 'long'}`, `{month: 'short'}`
  */

    // format a date to the "MM/DD/YYYY"    
    if (options === null) {
        options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    }
    const formattedDate = dateObject.toLocaleDateString('en-US', options) // format the date to string
        .replace(/,/g, ''); // remove commas
    return formattedDate
}

export function getWeekOfYear(date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const differenceInTime = date - oneJan;
  const oneWeek = 604800000; // milliseconds in a week
  return Math.ceil((differenceInTime / oneWeek) + 1);
}

export function getMonthFromWeekNumber(week) {
    const today = new Date();
    const date = new Date(today.getFullYear(), 0, week * 7); // January 1st of the specified year plus the week number multiplied by 7
    const month = date.toLocaleString('default', { month: 'short' });
    return month;
}
