import {Pipe, PipeTransform} from '@angular/core';
import {Workday} from '../../models/workday.model';

@Pipe({
  name: 'castWorkday',
  pure: true
})
export class CastWorkdayPipe implements PipeTransform {

  transform(item: any): Workday {
    return item as Workday;
  }
}
