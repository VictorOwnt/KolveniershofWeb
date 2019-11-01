import { Activity } from "./activity.model";
import { User } from "../user/user.model";

export class ActivityUnit {
  constructor(
    private _activity: Activity,
    private _mentors = new Array<User>(),
    private _clients = new Array<User>()
  ) {}

  static fromJSON(json: any): ActivityUnit {
    const act = new ActivityUnit(
      json.activity,
      json.mentors.map(User.fromJSON),
      json.clients.map(User.fromJSON)
    );
    return act;
  }

  toJSON(): any {
    return {
      activity: this.activity,
      mentors: this.mentors.map(ment => ment.toJSON()),
      clients: this.clients.map(client => client.toJSON())
    };
  }

  get activity(): Activity {
    return this._activity;
  }

  get mentors(): Array<User> {
    return this._mentors;
  }
  get clients(): Array<User> {
    return this._clients;
  }
}