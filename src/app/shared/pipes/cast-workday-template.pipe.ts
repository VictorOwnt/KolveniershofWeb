import {Pipe, PipeTransform} from '@angular/core';
import {WorkdayTemplate} from '../../models/workdayTemplate.model';

@Pipe({
  name: 'castWorkdayTemplate',
  pure: true
})
export class CastWorkdayTemplatePipe implements PipeTransform {

  transform(item: any): WorkdayTemplate {
    return item as WorkdayTemplate;
  }

}
