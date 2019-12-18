import {Pipe, PipeTransform} from '@angular/core';
import {LunchUnit} from '../../models/lunchUnit.model';

@Pipe({
  name: 'castLunchUnit',
  pure: true
})
export class CastLunchUnitPipe implements PipeTransform {

  transform(item: any): LunchUnit {
    return item as LunchUnit;
  }

}
