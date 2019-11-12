import { User } from "../user/user.model";

export class LunchUnit {
  constructor(
    private _id: string,
    private _lunch: string,
    private _mentors = new Array<User>(),
    private _clients = new Array<User>(),
    private _icon = "forkKnifeBlack.png"
  ) { }

  static fromJSON(json: any): LunchUnit {
    const lunchUnit = new LunchUnit(
      json._id,
      json.lunch,
      json.mentors.map(User.fromJSON),
      json.clients.map(User.fromJSON)
    );
    return lunchUnit;
  }

  toJSON(): any {
    return {
      _id: this._id,
      lunch: this._lunch,
      mentors: this.mentors.map(ment => ment.toJSON()),
      clients: this.clients.map(client => client.toJSON())
    };
  }

  get id(): string {
    return this._id
  }
  get mentors(): Array<User> {
    return this._mentors;
  }

  get clients(): Array<User> {
    return this._clients;
  }

  get icon(): string {
    return this._icon;
  }
  get lunch(): string {
    return this._lunch;
  }
  set lunch(food) {
    this._lunch = food;
  }
}
