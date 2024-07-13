"use client"

class TimeSeries {

  findMostRecentSunday(date) {
    let currentDate;
    date ? currentDate = new Date(date) : currentDate = new Date()
    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    let currentDay = currentDate.getDay();
  
    // Calculate the number of milliseconds in a day
    this.millisecondsInDay = 24 * 60 * 60 * 1000;
  
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
}

export const timeSeries = new TimeSeries();

export function getTimeSeries(nWeeks) {
  const datesArray = timeSeries.getArray(nWeeks);
  return datesArray;
}
