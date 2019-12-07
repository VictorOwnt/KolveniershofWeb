import {User} from './user.model';
import {BusUnit} from './busUnit.model';
import {ActivityUnit} from './activityUnit.model';
import {LunchUnit} from './lunchUnit.model';

export class WorkdayTemplate {
  id: string;
  templateName: string;
  weekNumber: number;
  dayNumber: number;
  daycareMentors: User[];
  morningBusses: BusUnit[];
  amActivities: ActivityUnit[];
  lunch: LunchUnit;
  pmActivities: ActivityUnit[];
  eveningBusses: BusUnit[];

  constructor(
    templateName: string,
    weekNumber: number,
    dayNumber: number,
    daycareMentors: User[],
    morningBusses: BusUnit[],
    amActivities: ActivityUnit[],
    lunch: LunchUnit,
    pmActivities: ActivityUnit[],
    eveningBusses: BusUnit[]
  ) {
    this.templateName = templateName;
    this.weekNumber = weekNumber;
    this.dayNumber = dayNumber;
    this.daycareMentors = daycareMentors;
    this.morningBusses = morningBusses;
    this.amActivities = amActivities;
    this.lunch = lunch;
    this.pmActivities = pmActivities;
    this.eveningBusses = eveningBusses;
  }

  static fromJSON(json: any): WorkdayTemplate {
    if ((json === undefined) || (json === null)) { return null; }
    const workdayTemplate = new WorkdayTemplate(
      json.templateName,
      json.weekNumber,
      json.dayNumber,
      json.daycareMentors.map(User.fromJSON),
      json.morningBusses.map(BusUnit.fromJSON),
      json.amActivities.map(ActivityUnit.fromJSON),
      LunchUnit.fromJSON(json.lunch),
      json.pmActivities.map(ActivityUnit.fromJSON),
      json.eveningBusses.map(BusUnit.fromJSON)
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
      morningBusses: this.morningBusses.map(busUnit => busUnit.toJSON()),
      amActivities: this.amActivities.map(activityUnit => activityUnit.toJSON()),
      lunch: this.lunch.toJSON(),
      pmActivities: this.pmActivities.map(activityUnit => activityUnit.toJSON()),
      eveningBusses: this.eveningBusses.map(busUnit => busUnit.toJSON())
    };
  }
}
