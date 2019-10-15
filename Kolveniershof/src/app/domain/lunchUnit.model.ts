import { User } from "../user/user.model";

export class LunchUnit {
  constructor(
    private _mentors = new Array<User>(),
    private _clients = new Array<User>()
  ) {}

  static fromJSON(json: any): LunchUnit {
    const lunchUnit = new LunchUnit(json.mentors, json.clients);
    return lunchUnit;
  }

  toJSON(): any {
    return { mentors: this.mentors, clients: this.clients };
  }

  get mentors(): Array<User> {
    return this._mentors;
  }

  get clients(): Array<User> {
    return this._clients;
  }
}
