import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor(private datepipe: DatePipe) { }

  /**
   * Add days to date, creates copy
   * @param date Date where days will be added to
   * @param days Amount of days to add
   */
  private static addDays(date: Date, days: number) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  /**
   * Subtract days from date, creates copy
   * @param date Date where days will be subtracted from
   * @param days Amount of days to subtract
   */
  private static subtractDays(date: Date, days: number) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() - days);
    return copy;
  }

  /**
   * Check if date is situated in weekend
   * @param date Date to check
   */
  isWeekend(date: Date) {
    return date.getDay() > 5 || date.getDay() === 0;
  }

  /**
   * Add week to date
   * @param date Date to add week to
   */
  addWeek(date: Date) {
    return DatesService.addDays(date, 7);
  }

  /**
   * Subtract week from date
   * @param date Date to subtract week from
   */
  subtractWeek(date: Date) {
    return DatesService.subtractDays(date, 7);
  }

  /**
   * Returns all weekdays based on day in week
   * @param date Date in week
   */
  weekDays(date: Date): Date[] {
    const mondayDate = DatesService.subtractDays(date, (date.getDay() - 1));
    const tuesdayDate = DatesService.addDays(mondayDate, 1);
    const wednesdayDate = DatesService.addDays(tuesdayDate, 1);
    const thursdayDate = DatesService.addDays(wednesdayDate, 1);
    const fridayDate = DatesService.addDays(thursdayDate, 1);
    const saturdayDate = DatesService.addDays(fridayDate, 1);
    const sundayDate = DatesService.addDays(saturdayDate, 1);
    return [mondayDate, tuesdayDate, wednesdayDate, thursdayDate, fridayDate, saturdayDate, sundayDate];
  }

  /**
   * Returns a date string based on backend url date format
   * @param date Date object to transform
   */
  backendFormatDate(date: Date): string {
    return this.datepipe.transform(date, 'dd_MM_yyyy');
  }

}
