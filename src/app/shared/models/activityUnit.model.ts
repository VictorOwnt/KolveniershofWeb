import { Activity } from './activity.model';
import { User } from './user.model';

export class ActivityUnit {
  id: string;
  activity: Activity;
  mentors: User[];
  clients: User[];

  constructor(activity: Activity, mentors: User[], clients: User[]) {
    this.activity = activity;
    this.mentors = mentors;
    this.clients = clients;
  }

  static fromJSON(json: any): ActivityUnit {
    if ((json === undefined) || (json === null)) { return null; }
    const activityUnit = new ActivityUnit(
      Activity.fromJSON(json.activity),
      json.mentors.map(User.fromJSON),
      json.clients.map(User.fromJSON)
    );
    activityUnit.id = json._id;
    return activityUnit;
  }

  toJSON() {
    return {
      _id : this.id,
      activity: this.activity.toJSON(),
      mentors: this.mentors.map(mentor => mentor.toJSON()),
      clients: this.clients.map(client => client.toJSON())
    };
  }
}
