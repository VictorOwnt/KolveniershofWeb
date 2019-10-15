import { User } from "../user/user.model";
import { ActivityUnit } from "./activityUnit.model";
import { LunchUnit } from "./lunchUnit.model";

import { BusUnit } from "./busUnit.model";

export class Workday {
  constructor(
    private _date = new Date(),
    private _amActivities = new Array<ActivityUnit>(),
    private _pmActivities = new Array<ActivityUnit>(),
    private _mentors = new Array<User>(),
    private _lunch: LunchUnit,
    private _amBusses = new Array<BusUnit>(),
    private _pmBusses = new Array<BusUnit>(),
    private _holiday: boolean
  ) {}

  static fromJSON(json: any): Workday {
    const workDay = new Workday(
      json.date,
      json.amActivities,
      json.pmActivities,
      json.mentors,
      json.lunch,
      json.amBusses,
      json.pmBusses,
      json.holiday
    );
    return workDay;
  }

  toJSON(): any {
    return {
      date: this.date,
      amActivities: this.amActivities, //this.amActivities.map(act => act.toJSON())
      pmActivities: this.pmActivities, //this.pmActivities.map(act => act.toJSON())
      mentors: this.mentors,
      lunch: this.lunch,
      amBusses: this.amBusses,
      pmBusses: this.pmBusses,
      holiday: this._holiday
    };
  }

  get date(): Date {
    return this._date;
  }
  get amActivities(): Array<ActivityUnit> {
    return this._amActivities;
  }
  get pmActivities(): Array<ActivityUnit> {
    return this._pmActivities;
  }
  get mentors(): Array<User> {
    return this._mentors;
  }
  get lunch(): LunchUnit {
    return this._lunch;
  }
  get amBusses(): Array<BusUnit> {
    return this._amBusses;
  }
  get pmBusses(): Array<BusUnit> {
    return this._pmBusses;
  }
}
