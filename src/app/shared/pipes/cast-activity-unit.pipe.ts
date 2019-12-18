import {Pipe, PipeTransform} from '@angular/core';
import {ActivityUnit} from '../../models/activityUnit.model';

@Pipe({
  name: 'castActivityUnit',
  pure: true
})
export class CastActivityUnitPipe implements PipeTransform {

  transform(item: any): ActivityUnit {
    return item as ActivityUnit;
  }

}
