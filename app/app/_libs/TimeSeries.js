"use client"

class TimeSeries {

  constructor() {
    // Calculate the number of milliseconds in a day
    this.millisecondsInDay = 24 * 60 * 60 * 1000;
  }

  findMostRecentSunday(date) {
    let currentDate;
    date ? currentDate = new Date(date) : currentDate = new Date()
    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    let currentDay = currentDate.getDay();
  
    // Adjust the date backwards to the most recent Sunday
    currentDate.setTime(currentDate.getTime() - currentDay * this.millisecondsInDay);

    currentDate.setHours(0, 0, 0, 0) // set to midnight
    this.recentSunday = currentDate;
    return this.recentSunday;
  }

  dateToUnixTimestamp(date) {
    return Math.floor(date.getTime() / 1000);
  }

  getRecentSundayTimestamp(date) {
    let result = this.findMostRecentSunday(date);
    return this.dateToUnixTimestamp(result);
  }

  getArray(nWeeks) {
    /* 
  Create an array of date objects consisting of Sundays starting from the upcoming Sunday
  to 1 year back
  */
    this.nWeeks = nWeeks;
    this.findMostRecentSunday();
    const datesArray = [];
    this.nextSunday = new Date(this.recentSunday);
    this.nextSunday.setTime(
      this.nextSunday.getTime() + this.millisecondsInDay * 7
    )
    datesArray.push(this.nextSunday);
    datesArray.push(
      /* new Date object must be instantiated in order for it to be added to the array */
      new Date(this.recentSunday) 
    );
    for (let i = 0; i < this.nWeeks; i++) {
      this.recentSunday.setTime(
        this.recentSunday.getTime() - this.millisecondsInDay * 7
      )
      let date = new Date(this.recentSunday);
      datesArray.push(date)

    }
    return datesArray;
  }

  daysSince(date1, date2) {
    /* 
    Calculate the number of days elapsed between dates
    */
    date1 ? date1 = new Date(date1) : date1 = new Date()
    date2 ? date1 = new Date(date2): date2 = new Date();

    const diffDays = Math.round(
      Math.abs((date2 - date1) / this.millisecondsInDay)
    );
    return diffDays;
  }

  nMonthsAgoDate(nMonths, date) {
    date = date ? new Date(date) : new Date();
    date.setHours(0, 0, 0, 0) // set to midnight
    const result = date.setMonth(
      date.getMonth() - nMonths
    )
    return new Date(result)
  }

  nDaysAgoDate(nDays, date) {
    date = date ? new Date(date) : new Date();
    date.setTime(date.getTime() - nDays * this.millisecondsInDay);
    return date;
  }
}

export const timeSeries = new TimeSeries();

export function getTimeSeries(nWeeks) {
  const datesArray = timeSeries.getArray(nWeeks);
  return datesArray;
}
