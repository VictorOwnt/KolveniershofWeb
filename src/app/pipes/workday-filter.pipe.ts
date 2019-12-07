import { Pipe, PipeTransform } from '@angular/core';
import {Workday} from '../shared/models/workday.model';
import {DatesService} from '../services/dates.service';

@Pipe({
  name: 'workdayFilter'
})
export class WorkdayFilterPipe implements PipeTransform {

  constructor(private datesService: DatesService) {}

  transform(workdays: Workday[], weekend: boolean): Workday[] {
    if (!workdays) {
      return [];
    }

    return weekend ?
      workdays.filter(workday => this.datesService.isWeekend(workday.date)) :
      workdays.filter(workday => !this.datesService.isWeekend(workday.date));
  }

}
