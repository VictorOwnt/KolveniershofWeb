import { User } from './user.model';
import { ActivityUnit } from './activityUnit.model';
import { LunchUnit } from './lunchUnit.model';

import { BusUnit } from './busUnit.model';

export class Comment {
  id: string;
  comment: string;
  client: User;

  constructor(comment: string, client: User) {
    this.comment = comment;
    this.client = client;
  }

  static fromJSON(json: any): Comment {
    const comment = new Comment(json.comment, json.user);
    comment.id = json._id;
    return comment;
  }

  toJSON() {
    return {
      _id: this.id,
      comment: this.comment,
      client: this.client
    };
  }
}

export class Workday {
  id: string;
  date: Date;
  originalTemplateName: string;
  originalWeekNumber: number;
  daycareMentors: User[];
  morningBusses: BusUnit[];
  amActivities: ActivityUnit[];
  lunch: LunchUnit;
  pmActivities: ActivityUnit[];
  eveningBusses: BusUnit[];
  holiday: boolean;
  comments: Comment[];


  constructor(
    date: Date,
    originalTemplateName: string,
    originalWeekNumber: number,
    daycareMentors: User[],
    morningBusses: BusUnit[],
    amActivities: ActivityUnit[],
    lunch: LunchUnit,
    pmActivities: ActivityUnit[],
    eveningBusses: BusUnit[],
    holiday: boolean,
    comments: Comment[]
  ) {
    this.date = new Date(date);
    this.originalTemplateName = originalTemplateName;
    this.originalWeekNumber = originalWeekNumber;
    this.daycareMentors = daycareMentors;
    this.morningBusses = morningBusses;
    this.amActivities = amActivities;
    this.lunch = lunch;
    this.pmActivities = pmActivities;
    this.eveningBusses = eveningBusses;
    this.holiday = holiday;
    this.comments = comments;
  }

  static fromJSON(json: any): Workday {
    const workday = new Workday(
      json.date,
      json.originalTemplateName,
      json.originalWeekNumber,
      json.daycareMentors.map(User.fromJSON),
      json.morningBusses.map(BusUnit.fromJSON),
      json.amActivities.map(ActivityUnit.fromJSON),
      json.lunch,
      json.pmActivities.map(ActivityUnit.fromJSON),
      json.eveningBusses.map(BusUnit.fromJSON),
      json.holiday,
      json.comments.map(Comment.fromJSON)
    );
    workday.id = json._id;
    return workday;
  }

  toJSON() {
    return {
      _id: this.id,
      date: this.date,
      originalTemplateName: this.originalTemplateName,
      originalWeekNumber: this.originalWeekNumber,
      morningBusses: this.morningBusses.map(busUnit => busUnit.toJSON()),
      amActivities: this.amActivities.map(activityUnit => activityUnit.toJSON()),
      lunch: this.lunch,
      pmActivities: this.pmActivities.map(activityUnit => activityUnit.toJSON()),
      eveningBusses: this.eveningBusses.map(busUnit => busUnit.toJSON()),
      holiday: this.holiday,
      comments: this.comments.map(comment => comment.toJSON())
    };
  }
}
