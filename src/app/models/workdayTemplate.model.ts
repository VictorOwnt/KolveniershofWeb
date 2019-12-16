import {User} from './user.model';
import {BusUnit} from './busUnit.model';
import {ActivityUnit} from './activityUnit.model';
import {LunchUnit} from './lunchUnit.model';

export class WorkdayTemplate {
  id: string;
  templateName: string;
  weekNumber: number;
  dayNumber: number;
  dayActivities: ActivityUnit[];
  daycareMentors: User[];
  morningBusses: BusUnit[];
  amActivities: ActivityUnit[];
  lunch: LunchUnit;
  pmActivities: ActivityUnit[];
  eveningBusses: BusUnit[];
  holiday: boolean;

  constructor(
    templateName: string,
    weekNumber: number,
    dayNumber: number,
    dayActivities: ActivityUnit[],
    daycareMentors: User[],
    morningBusses: BusUnit[],
    amActivities: ActivityUnit[],
    lunch: LunchUnit,
    pmActivities: ActivityUnit[],
    eveningBusses: BusUnit[],
    holiday: boolean
  ) {
    this.templateName = templateName;
    this.weekNumber = weekNumber;
    this.dayNumber = dayNumber;
    this.dayActivities = dayActivities;
    this.daycareMentors = daycareMentors;
    this.morningBusses = morningBusses;
    this.amActivities = amActivities;
    this.lunch = lunch;
    this.pmActivities = pmActivities;
    this.eveningBusses = eveningBusses;
    this.holiday = holiday;
  }

  static fromJSON(json: any): WorkdayTemplate {
    if ((json === undefined) || (json === null)) {
      return null;
    }
    const workdayTemplate = new WorkdayTemplate(
      json.templateName,
      json.weekNumber,
      json.dayNumber,
      json.dayActivities.map(ActivityUnit.fromJSON),
      json.daycareMentors.map(User.fromJSON),
      json.morningBusses.map(BusUnit.fromJSON),
      json.amActivities.map(ActivityUnit.fromJSON),
      LunchUnit.fromJSON(json.lunch),
      json.pmActivities.map(ActivityUnit.fromJSON),
      json.eveningBusses.map(BusUnit.fromJSON),
      json.holiday
    );
    workdayTemplate.id = json._id;
    return workdayTemplate;
  }

  toJSON() {
    return {
      _id: this.id,
      templateName: this.templateName,
      weekNumber: this.weekNumber,
      dayNumber: this.dayNumber,
      dayActivities: this.dayActivities.map(activityUnit => activityUnit.toJSON()),
      morningBusses: this.morningBusses.map(busUnit => busUnit.toJSON()),
      amActivities: this.amActivities.map(activityUnit => activityUnit.toJSON()),
      lunch: this.lunch.toJSON(),
      pmActivities: this.pmActivities.map(activityUnit => activityUnit.toJSON()),
      eveningBusses: this.eveningBusses.map(busUnit => busUnit.toJSON()),
      holiday: this.holiday
    };
  }
}
