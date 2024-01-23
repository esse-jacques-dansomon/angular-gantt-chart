import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  monthDiff(firstMonth: Date, lastMonth: Date): number {
    let months;
    months = (lastMonth.getFullYear() - firstMonth.getFullYear()) * 12;
    months -= firstMonth.getMonth();
    months += lastMonth.getMonth();
    return months <= 0 ? 0 : months;
  }

  dayDiff(startDate: Date, endDate: Date): number {
    const difference = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    return days;
  }

  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

  getDayOfWeek(year: number, month: number, day: number): string {
    const daysOfTheWeekArr = ["M", "T", "W", "T", "F", "S", "S"];
    const dayOfTheWeekIndex = new Date(year, month, day).getDay();
    return daysOfTheWeekArr[dayOfTheWeekIndex];
  }

  createFormattedDateFromStr(year: number, month: number, day: number): string {
    let monthStr = month.toString();
    let dayStr = day.toString();

    if (monthStr.length === 1) {
      monthStr = `0${monthStr}`;
    }
    if (dayStr.length === 1) {
      dayStr = `0${dayStr}`;
    }

    return `${year}-${monthStr}-${dayStr}`;
  }

  createFormattedDateFromDate(date: Date): string {
    let monthStr = (date.getMonth() + 1).toString();
    let dayStr = date.getDate().toString();

    if (monthStr.length === 1) {
      monthStr = `0${monthStr}`;
    }
    if (dayStr.length === 1) {
      dayStr = `0${dayStr}`;
    }

    return `${date.getFullYear()}-${monthStr}-${dayStr}`;
  }
}
